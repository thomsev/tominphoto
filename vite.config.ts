import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'video-cache',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (/^\/films\/film-\d+-[a-f0-9]{12}\.(mp4|jpg)$/.test((req.url || '').split('?')[0])) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        }
        next()
      })
    },
  }],
})
