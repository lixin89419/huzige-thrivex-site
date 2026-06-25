# 使用官方的Node.js镜像作为依赖阶段
FROM node:20-alpine AS deps

# 设置工作目录
WORKDIR /thrive

# 配置 npm 镜像源
RUN npm config set registry https://registry.npmmirror.com

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci

# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /thrive

COPY --from=deps /thrive/node_modules ./node_modules

# 复制所有文件到工作目录
COPY . .

# 构建Next.js应用
RUN npm run build

# 运行阶段，只保留 standalone 产物
FROM node:20-alpine AS runner

WORKDIR /thrive

ENV NODE_ENV=production
ENV PORT=9001
ENV HOSTNAME=0.0.0.0

COPY --from=builder /thrive/public ./public
COPY --from=builder /thrive/.next/static ./.next/static
COPY --from=builder /thrive/.next/standalone ./

# 暴露应用运行的端口
EXPOSE 9001

# 启动Next.js应用
CMD ["node", "server.js"]
