export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'raspberrypi.bison-algol.ts.net',
            'https://potrerillos-frontend.pages.dev',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'raspberrypi.bison-algol.ts.net',
            'https://potrerillos-frontend.pages.dev',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://potrerillos-frontend.pages.dev',  // Tu URL de Cloudflare Pages
        'http://localhost:3000',                    // Desarrollo local
        'http://localhost:3001',                    // Desarrollo local alternativo
        // Producción futura:
        // 'https://diquepotrerillos.com.ar',
        // 'https://www.diquepotrerillos.com.ar',
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
