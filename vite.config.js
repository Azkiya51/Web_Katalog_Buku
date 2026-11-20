import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Jika di-deploy di sub-folder (mis. https://situsmu.com/katalog-buku/),
// ubah base menjadi '/katalog-buku/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
