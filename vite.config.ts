import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://1e14c3489fcb.vps.myjino.ru:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})