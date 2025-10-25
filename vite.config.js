export default {
  server: {
    // Acepta CUALQUIER hostname
    host: true,
    strictPort: false,
    
    // IMPORTANTE: Desactiva la validación de host
    hmr: {
      clientPort: 1337,
    },
  },
  
  // Desactivar validación de host completamente
  preview: {
    host: true,
  },
}
