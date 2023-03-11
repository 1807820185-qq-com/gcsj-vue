import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

function pathResolve(dir: string): string {
  return resolve(process.cwd(), '.', dir)
};
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': pathResolve('src')
    }
  },
  server: {
    host: '0.0.0.0', //ip地址
    port: 8082, //端口号
    open: true //启动后是否自动打开浏览器
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:'@import "./src/assets/style/main.scss";'
      }
    }
  }
})
