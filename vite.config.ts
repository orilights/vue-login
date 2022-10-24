import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue()], 
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@views': path.resolve(__dirname, './src/views'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
})
