import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() ,tailwindcss()],
  server: {
    host: true, // permet d'accepter toutes les adresses
    port: 5173, // le port que tu exposes via ngrok
    strictPort: true, // empêche Vite de changer de port
    cors: true, // autorise les requêtes cross-origin
    allowedHosts: [
      '1816-129-0-189-42.ngrok-free.app'
      

    ]}
});
 
