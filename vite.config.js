import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(), // 激活 Tailwind v4 引擎
    viteCompression({
      threshold: 10240, // 超过 10kb 的文件才压缩
      algorithm: 'gzip',
      ext: '.gz',
      verbose: false
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Vite 8 (Rolldown) 要求 manualChunks 使用函数形式
        manualChunks(id) {
          // 将 vue 相关库打包在一起
          if (/node_modules[\\/](vue|vue-router|pinia)[\\/]/.test(id)) {
            return 'vue-vendor'
          }
          // 其他第三方库（如以后引入的 axios 或 echarts）
          // if (id.includes('axios')) return 'utils-vendor'
        }
      }
    }
  }
})
