import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['.js', '.mjs', '.jsx', '.json'], 
  },
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for build
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080', // Proxy API calls during development
    },
  },
})
