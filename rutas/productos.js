const ruta = require('express').Router();
const { verMovimientosBodega, ventasProductos} = require('../controladores/movimientos');
const { getProductos } = require('../controladores/productos.control');
ruta.get('/', (req, res) => res.json('Bienvenido a la API de GEOCONSTRUCTOR!'))
ruta.get('/productos', async (req, res) => {
  try {
    const productos = await getProductos();
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
})

ruta.get('/productos/:codigoProducto', async (req, res) => {
  const {codigoProducto} = req.params
  try {
    const productos = await verMovimientosBodega(codigoProducto);
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
})

ruta.get('/ventas', async (req, res) => {
  try {
    const movimientos = await ventasProductos()
    res.json(movimientos);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
})
module.exports = ruta