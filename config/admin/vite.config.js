import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'raspberrypi.bison-algol.ts.net',
    ],
  },
});
