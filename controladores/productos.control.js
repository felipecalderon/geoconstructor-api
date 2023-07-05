const pool = require('../database')

const getProductos = async () => {
    const conexionDB = await pool.getConnection();
    const consulta = `
        SELECT 
          insumos_venta.codigo, 
          insumos_venta.Nombre, 
          insumos_venta.cod_barra, 
          insumos_venta.peso, 
          categorias.Categoria, 
          Round(Sum(bodegas_movimientos.Entrada-bodegas_movimientos.Salida)) AS Stock, 
          Round(insumos_venta.precio,0) AS PrecioNeto, 
          Round(insumos_venta.precio*1.19,1) AS PrecioIVA,
          insumos_venta.activo 
        FROM 
          bodegas_movimientos 
          INNER JOIN insumos_venta ON bodegas_movimientos.codigo = insumos_venta.codigo 
          INNER JOIN categorias ON insumos_venta.categoria = categorias.id_categoria 
        WHERE
          insumos_venta.categoria NOT IN (152, 154)
        GROUP BY 
          insumos_venta.codigo, 
          insumos_venta.Nombre, 
          insumos_venta.cod_barra, 
          categorias.Categoria, 
          Round(precio,0), 
          Round(precio*1.19,1), 
          insumos_venta.activo 
        HAVING 
          ROUND(SUM(bodegas_movimientos.Entrada-bodegas_movimientos.Salida))>=0`;
    try {
      const [productos] = await conexionDB.query(consulta);
      const OUTDOOR = "CALZADO OUTDOOR"
      const TRAIL = "ZAPATILLA TRAIL"
      if(productos.length === 0) return 'No hay productos'
      const cleanProductos = productos.map(producto => {
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
              activo: activo === 'S' ? 'visible' : 'oculto'
            }
          })
      return cleanProductos;
    } catch (error) {
      throw error;
    } finally {
      conexionDB.release();
  }
}

const getProductosVariables = async () => {
  const conexionDB = await pool.getConnection();
  const consulta = `
      SELECT 
        insumos_venta.codigo, 
        insumos_venta.Nombre, 
        insumos_venta.cod_barra, 
        insumos_venta.peso, 
        categorias.Categoria, 
        Round(Sum(bodegas_movimientos.Entrada-bodegas_movimientos.Salida)) AS Stock, 
        Round(insumos_venta.precio,0) AS PrecioNeto, 
        Round(insumos_venta.precio*1.19,1) AS PrecioIVA,
        insumos_venta.activo 
      FROM 
        bodegas_movimientos 
        INNER JOIN insumos_venta ON bodegas_movimientos.codigo = insumos_venta.codigo 
        INNER JOIN categorias ON insumos_venta.categoria = categorias.id_categoria 
      WHERE
        insumos_venta.categoria IN (152, 154)
      GROUP BY 
        insumos_venta.codigo, 
        insumos_venta.Nombre, 
        insumos_venta.cod_barra, 
        categorias.Categoria, 
        Round(precio,0), 
        Round(precio*1.19,1), 
        insumos_venta.activo 
      HAVING 
        ROUND(SUM(bodegas_movimientos.Entrada-bodegas_movimientos.Salida))>=0`;
  try {
    const [productos] = await conexionDB.query(consulta);
    if(productos.length === 0) return 'No hay productos'
    const regex = /N°\d+\s/g;
    const cleanProductos = productos.map(producto => {
        const { peso, PrecioIVA, codigo, Nombre, Categoria, PrecioNeto, Stock, activo } = producto;
        const talla = Nombre.match(regex)?.toString()?.trim()
        const nombre = Nombre.replace(regex, '');
        const fijarStock = Stock < 0 ? Stock * -1 : Stock;
        const Iva = peso ? peso : PrecioIVA;
        const Oferta = peso ? PrecioIVA : '';
          return {
            sku: codigo,
            nombre,
            categoria: Categoria,
            precioNeto: PrecioNeto,
            precioIva: Iva,
            precioOferta: Oferta,
            stock: fijarStock,
            activo: activo === 'S' ? 'visible' : 'hidden',
            talla
          }
        })
    return cleanProductos;
  } catch (error) {
    throw error;
  } finally {
    conexionDB.release();
}
}
module.exports = {getProductos, getProductosVariables}