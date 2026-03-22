import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'Panal®',
        short_name: 'Panal - Desktop',

        description: 'Sistema de soporte técnico inteligente',

        theme_color: '#14224a',
        background_color: '#14224a',

        display: 'standalone',
        start_url: '/landing',

        icons: [
          {
            src: '/pwa-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })

  ],

  // 🔥 AQUÍ VA LO NUEVO
  server: {
    proxy: {
      '/api': {
        target: 'https://waggish-unsecludedly-jong.ngrok-free.dev',
        changeOrigin: true,
        secure: false,
      }
    }
  }

})