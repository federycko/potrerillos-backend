export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  //url: env('PUBLIC_URL', 'http://localhost:1337'),
  
  //// IMPORTANTE: Habilitar proxy mode
  //proxy: true,
  
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
    // Permitir cualquier host en admin
    url: env('ADMIN_URL', '/admin'),
    serveAdminPanel: env.bool('SERVE_ADMIN', true),
  },
});
