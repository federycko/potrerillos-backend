import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    port: 1337,
    strictPort: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'raspberrypi',
      'raspberrypi.bison-algol.ts.net',
    ],
    cors: true,
  },
});
