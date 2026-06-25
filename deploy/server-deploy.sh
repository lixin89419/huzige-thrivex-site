#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR=${APP_DIR:-/opt/huzige-thrivex}
REPO_RAW=${REPO_RAW:-https://raw.githubusercontent.com/lixin89419/huzige-thrivex-site/main}

mkdir -p "$APP_DIR/nginx" "$APP_DIR/server"
cd "$APP_DIR"

if ! command -v docker >/dev/null 2>&1; then
  apt-get update
  DEBIAN_FRONTEND=noninteractive apt-get install -y ca-certificates curl gnupg
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc
  . /etc/os-release
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu ${VERSION_CODENAME} stable" >/etc/apt/sources.list.d/docker.list
  apt-get update
  DEBIAN_FRONTEND=noninteractive apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi

if [ ! -f .env ]; then
  MYSQL_PASS="$(openssl rand -base64 24 | tr -d '\n')"
  cat > .env <<ENVEOF
MYSQL_ROOT_PASSWORD=$(openssl rand -base64 24 | tr -d '\n')
MYSQL_DATABASE=ThriveX
MYSQL_USER=thrive
MYSQL_PASSWORD=$MYSQL_PASS
DB_NAME=ThriveX
DB_USERNAME=thrive
DB_PASSWORD=$MYSQL_PASS
EMAIL_HOST=mail.qq.com
EMAIL_PORT=465
EMAIL_USERNAME=
EMAIL_PASSWORD=
ENVEOF
else
  MYSQL_PASS="$(grep '^MYSQL_PASSWORD=' .env | tail -n 1 | cut -d= -f2- || true)"
  MYSQL_USER_VALUE="$(grep '^MYSQL_USER=' .env | tail -n 1 | cut -d= -f2- || true)"
  [ -n "$MYSQL_PASS" ] && sed -i "s|^DB_PASSWORD=.*|DB_PASSWORD=$MYSQL_PASS|" .env
  [ -n "$MYSQL_USER_VALUE" ] && sed -i "s|^DB_USERNAME=.*|DB_USERNAME=$MYSQL_USER_VALUE|" .env
fi

curl -fsSL "$REPO_RAW/deploy/docker-compose.prod.yml" -o docker-compose.yml
curl -fsSL "$REPO_RAW/deploy/nginx/default.conf" -o nginx/default.conf
curl -fsSL "$REPO_RAW/ThriveX-Server/ThriveX.sql" -o ThriveX.sql
curl -fL --retry 5 --retry-delay 3 https://github.com/LiuYuYang01/ThriveX-Server/releases/download/2.5.2/blog.jar -o server/app.jar

set -a
. ./.env
set +a

docker compose pull
docker compose up -d mysql redis

for i in $(seq 1 60); do
  if docker compose exec -T mysql mysqladmin ping -h 127.0.0.1 -uroot -p"${MYSQL_ROOT_PASSWORD}" --silent >/dev/null 2>&1; then
    break
  fi
  if [ "$i" -eq 60 ]; then
    echo "MySQL did not become healthy"
    docker compose logs --tail=120 mysql
    exit 1
  fi
  sleep 2
done

if ! docker compose exec -T mysql mysql -uroot -p"${MYSQL_ROOT_PASSWORD}" "${MYSQL_DATABASE}" -N -e "SHOW TABLES LIKE 'article';" | grep -q '^article$'; then
  docker compose exec -T mysql mysql -uroot -p"${MYSQL_ROOT_PASSWORD}" "${MYSQL_DATABASE}" < ThriveX.sql
fi

docker compose up -d --remove-orphans

for url in http://127.0.0.1/api/web_config/name/web http://127.0.0.1/admin/ http://127.0.0.1/; do
  echo "Checking $url"
  curl -fsSI --max-time 20 "$url" >/dev/null || curl -fsS --max-time 20 "$url" >/dev/null
done

docker compose ps
