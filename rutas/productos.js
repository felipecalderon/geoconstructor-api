const ruta = require('express').Router();
const { verMovimientosBodega, ventasProductos, verPreventaDetalle} = require('../controladores/movimientos');
const { getProductos } = require('../controladores/productos.control');

ruta.get('/', (req, res) => res.send(htmlHome))
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
    const { fechaDesde, fechaHasta } = req.query
    const movimientos = await ventasProductos(fechaDesde, fechaHasta)
    res.json(movimientos);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
})

ruta.get('/preventa/:preventa', async (req, res) => {
  try {
    const { preventa } = req.params
    console.log({preventa})
    const movimientos = await verPreventaDetalle(preventa)
    res.json(movimientos);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
})

const htmlHome = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>API de GEOCONSTRUCTOR</title>
  <style>
    body {
      background-color: #f4f4f4;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-family: Arial, sans-serif;
    }
    .container {
      background: #fff;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .container h1 {
      margin-bottom: 20px;
      color: #333;
    }
    .container p {
      font-size: 20px;
      color: #555;
    }
    .container .check {
      color: green;
      font-size: 24px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>API de GEOCONSTRUCTOR</h1>
    <p>Funcionando correctamente <span class="check">✔</span></p>
  </div>
</body>
</html>
`

module.exports = ruta