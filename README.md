# HuziGe ThriveX Site

胡子哥个人网站部署仓库，基于 ThriveX-Blog / ThriveX-Admin / ThriveX-Server。

## Production

- Blog: `/`
- Admin: `/admin/`
- API: `/api/`
- ICP: `鲁ICP备2020034925号-1`

## Deploy

服务器目录建议使用：

```bash
/opt/huzige-thrivex
```

生产部署文件在：

```bash
deploy/docker-compose.prod.yml
deploy/nginx/default.conf
deploy/.env.example
```

服务器只需要拉取 GHCR 镜像并运行 Docker Compose，不在服务器上编译源码。

