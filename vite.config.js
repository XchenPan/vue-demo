import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { viteMockServe } from "vite-plugin-mock"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "mock",
      localEnabled: true,
      prodEnabled: false,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    host: "127.0.0.1",
    port: 2333,
    proxy: {
      "/api": {
        target: "http://localhost:8080/",  // 你的后端服务地址
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""  // 如果后端接口没有/api前缀，可以将其去除
        },
      }
    }
  }
})
