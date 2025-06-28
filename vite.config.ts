// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// --------------------------------------------------
// Vite dev-server settings
// --------------------------------------------------
//  ▸ Any request whose path starts with /auth or /hotels
//    is transparently proxied to http://localhost:3000.
//  ▸ When you add more API prefixes later (e.g. /profile),
//    just append another key: '/profile': 'http://localhost:3000'
//
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth':   'http://localhost:3000',
      '/hotels': 'http://localhost:3000',
      // '/profile': 'http://localhost:3000',   // <-- add when needed
    },
  },
});
