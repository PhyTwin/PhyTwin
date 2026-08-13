import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 绑定自定义域名，静态资源必须使用绝对根路径。
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: { sourcemap: false, target: 'es2020', chunkSizeWarningLimit: 5000 },
})
