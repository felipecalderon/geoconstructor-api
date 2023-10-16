const ruta = require('express').Router();
const { verMovimientosBodega } = require('../controladores/movimientos');
const { getProductos } = require('../controladores/productos.control');
ruta.get('/', (req, res) => res.send('Bienvenido a la API de GEOCONSTRUCTOR!'))
ruta.get('/productos', async (req, res) => {
  try {
    const productos = await getProductos();
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

ruta.get('/productos/:codigoProducto', async (req, res) => {
  const {codigoProducto} = req.params
  try {
    const productos = await verMovimientosBodega(codigoProducto);
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})
module.exports = ruta