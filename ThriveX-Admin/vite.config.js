/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import sassDts from 'vite-plugin-sass-dts';
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sassDts()],
  // 配置快捷路径
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, 'src')
    },
  },
  // 配置scss样式自动引入
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(__dirname, 'src/styles')],
        additionalData: `@use "var.scss" as *;`
      }
    }
  },
  server: {
    port: 9100,
  },
})
