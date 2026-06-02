import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,        // expose on 0.0.0.0 — accessible from network/LAN
    strictPort: true,  // fail if 5173 is taken instead of picking another
    open: false,
  },
  preview: {
    port: 5173,
    host: true,
    strictPort: true,
  },
})
