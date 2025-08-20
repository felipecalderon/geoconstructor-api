var Service = require('node-windows').Service;

var svc = new Service({
  name: 'API Geoconstructor',
  description: 'Conectando sistema con página web',
  script: 'C:\\Users\\Server\\Desktop\\api\\app.js',
  cwd: 'C:\\Users\\Server\\Desktop\\api'
});

svc.on('install', function() {
  svc.start();
});

svc.install();