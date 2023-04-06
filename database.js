const mysql = require('mysql2')

const conexionDb = mysql.createPool({
    host: 'localhost',
    user: 'admin2',
    password: 'admin123',
    database: 'stna_gestion',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  
module.exports = conexionDb;