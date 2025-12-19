import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

// https://vite.dev/config/
const base = process.env.VITE_BASE || (process.env.NODE_ENV === 'production' ? '/ohmyzsh-theme-carousel/' : '/');

export default defineConfig({
  plugins: [react(), tailwind()],
  base,
})
