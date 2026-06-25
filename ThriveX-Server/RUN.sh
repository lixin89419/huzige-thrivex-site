#!/bin/sh
set -e

export DB_INFO="${DB_HOST}:${DB_PORT}/${DB_NAME}"

echo "Waiting for MySQL at ${DB_HOST}:${DB_PORT}..."
for i in $(seq 1 30); do
  if /server/database-initialized \
    -user "${DB_USERNAME}" \
    -password "${DB_PASSWORD}" \
    -host "${DB_HOST}" \
    -port "${DB_PORT}" \
    -dbname "${DB_NAME}" \
    -file /server/ThriveX.sql; then
    break
  fi

  if [ "$i" -eq 30 ]; then
    echo "Database initialization failed after ${i} attempts"
    exit 1
  fi

  sleep 3
done

exec java -jar /server/app.jar

