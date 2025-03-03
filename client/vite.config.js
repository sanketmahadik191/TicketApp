import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://ticketapp-jz7r.onrender.com", // Backend URL
        // target: process.env.VITE_API_BASE_URL, // Use environment variable
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
