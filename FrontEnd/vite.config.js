import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base:"/",
  server:{
    proxy:{
      '/user': 'https://voting-6qcx.onrender.com/',
      '/candidate': 'https://voting-6qcx.onrender.com/',
      '/voting': 'https://voting-6qcx.onrender.com/',
    },
  },
})
