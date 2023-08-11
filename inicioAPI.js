var Service = require('node-windows').Service;

// Crea un nuevo objeto de servicio
var svc = new Service({
  name: 'API Geoconstructor',    // Nombre del servicio
  description: 'Conectando sistema con página web',
  script: 'C:\\Users\\Admin\\Desktop\\api\\app.js' // Ruta a tu script principal de Node.js
});

svc.on('install', function() {
  svc.start();
});

svc.install();