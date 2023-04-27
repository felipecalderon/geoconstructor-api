const ruta = require('express').Router();
const { getProductosVariables } = require('../controladores/productos.control');

ruta.get('/variables', async (req, res) => {
    try {
      const productos = await getProductosVariables();
      res.json(productos);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  })

module.exports = ruta