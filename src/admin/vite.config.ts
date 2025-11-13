import { defineConfig } from 'vite';
import type { ViteUserConfig } from '@strapi/types';

export default defineConfig((config: ViteUserConfig) => ({
  ...config,
  server: {
    ...config.server,
    host: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'raspberrypi',
      'raspberrypi.bison-algol.ts.net',
    ],
  },
}));
