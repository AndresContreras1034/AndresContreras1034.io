import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite para dominio personalizado
export default defineConfig({
  plugins: [react()],
  base: '/', 
})
