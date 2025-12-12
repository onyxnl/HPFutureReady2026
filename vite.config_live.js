import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
export default defineConfig({
  base: '/HP/2026/HP_FutureReady/',
  plugins: [react(),svgr()],
  build: {
    chunkSizeWarningLimit: 1000 // Set the chunk size limit to 1MB (default is 500 KB)
  },
  
})
