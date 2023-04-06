const ruta = require('express').Router();
const connection = require('../db')

ruta.get('/', (req, res) => {
  const  consultasis = 'SELECT * from clientes_proveedores';
  connection.query(consultasis, (error, resultado) => {
    if (error) throw error;
    if (resultado.length > 0) {
    const clientes = resultado.map((cliente) => {
        let telefono = null
        if(cliente.fono) telefono = cliente.fono
        if(cliente.celular) telefono = cliente.celular
        if(cliente.email) return {
            nombre :   cliente.NombreEmpresa,
            domicilio: cliente.Direccion,
            ciudad: cliente.ciudad,
            pais: cliente.pais,
            email: cliente.email,
            telefono
            }
      }).filter(cliente => cliente !== undefined);
      res.json(clientes)
    } 
    else {
      res.send('No se encontraron clientes');
      }
  });
});

module.exports = ruta