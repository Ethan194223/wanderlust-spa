// vite.config.ts  – project root
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      //  @/…  ➜  /absolute/path/to/src/…
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});

