const ruta = require('express').Router();
const { getProductos } = require('../controladores/productos.control');

ruta.get('/productos', async (req, res) => {
  try {
    const productos = await getProductos();
    
    if (productos.length > 0) {
      const result = productos.map(producto => {
        const { peso, PrecioIVA, codigo, Nombre, Categoria, PrecioNeto, Stock, activo } = producto;
        const fijarStock = Stock < 0 ? Stock * -1 : Stock;
        const Iva = peso ? peso : PrecioIVA;
        const Oferta = peso ? PrecioIVA : '';
  
        return {
          sku: codigo,
          nombre: Nombre,
          categoria: Categoria,
          precioNeto: PrecioNeto,
          precioIva: Iva,
          precioOferta: Oferta,
          stock: fijarStock,
          activo: activo === 'S' ? 'visible' : 'hidden'
        };
      });
  
      res.json(result);
    } else {
      res.send('Not result');
    }
  } catch (error) {
    console.log(error);
    res.send('Error');
  }
})

// ruta.get('/:codigo', (req, res) => {
//   const { codigo } = req.params;
//   const sql = `SELECT insumos_venta.codigo, insumos_venta.Nombre, insumos_venta.cod_barra, categorias.Categoria, Round(Sum(bodegas_movimientos.Entrada-bodegas_movimientos.Salida)) AS Stock, Round(insumos_venta.precio,0) AS PrecioNeto, Round(insumos_venta.precio*1.19,1) AS PrecioIVA, "" AS PrecioOferta, "" AS Fin_Oferta, insumos_venta.activo FROM (bodegas_movimientos INNER JOIN insumos_venta ON bodegas_movimientos.codigo = insumos_venta.codigo) INNER JOIN categorias ON insumos_venta.categoria = categorias.id_categoria GROUP BY insumos_venta.codigo, insumos_venta.Nombre, insumos_venta.cod_barra, categorias.Categoria, Round(precio,0), Round(precio*1.19,1), "", insumos_venta.activo, "" HAVING (((Round(Sum(bodegas_movimientos.Entrada-bodegas_movimientos.Salida)))>=0) AND ((insumos_venta.activo)="S") AND ((insumos_venta.codigo)=${codigo}));`;
//   conexionDb.query(sql, (error, result) => {
//     if (error) throw error;

//     if (result.length > 0) {
//       res.json(result);
//     } else {
//       res.send('Not result');
//     }
//   });
// });

module.exports = ruta