const pool = require('../database')

const verMovimientosBodega = async (codigoProducto) => {
    const conexionDB = await pool.getConnection();
    try {
        const consulta = `SELECT *
        FROM stna_gestion.bodegas_movimientos AS bm
        JOIN stna_gestion.insumos_venta AS iv ON bm.codigo = iv.codigo
        WHERE iv.codigo = ${codigoProducto};`
        const [productos] = await conexionDB.query(consulta);
        return productos
    } catch (error) {
        throw 'No se pudo obtener movimientos de bodega'
    } finally {
        conexionDB.release();
    }
}

const getProductosConBodega = async () => {
    const conexionDB = await pool.getConnection();
    const consulta = `SELECT 
    insumos_venta.codigo, 
    insumos_venta.Nombre, 
    insumos_venta.cod_barra, 
    insumos_venta.peso, 
    categorias.Categoria, 
    Round(Sum(bodegas_movimientos.Entrada-bodegas_movimientos.Salida)) AS Stock, 
    Round(insumos_venta.precio, 0) AS PrecioNeto, 
    Round(insumos_venta.precio * 1.19, 1) AS PrecioIVA,
    insumos_venta.activo,
    bm.NombreBodega,
    bm.Numero_Transaccion,
    bm.Entrada AS UltimaEntrada,
    bm.Fecha AS FechaUltimaEntrada,
    bm.Encargado AS EncargadoUltimaEntrada,
    bm.PMP AS PMPUltimaEntrada
  FROM 
    bodegas_movimientos 
    INNER JOIN insumos_venta ON bodegas_movimientos.codigo = insumos_venta.codigo 
    INNER JOIN categorias ON insumos_venta.categoria = categorias.id_categoria 
    LEFT JOIN (
        SELECT
          iv.codigo,
          bm.NombreBodega,
          bm.Numero_Transaccion,
          bm.Entrada,
          bm.Fecha,
          bm.Encargado,
          bm.PMP
        FROM stna_gestion.bodegas_movimientos AS bm
        JOIN stna_gestion.insumos_venta AS iv ON bm.codigo = iv.codigo
        WHERE bm.Entrada != '0.00'
        AND (
          bm.Fecha, iv.codigo
        ) IN (
          SELECT MAX(bm2.Fecha), iv2.codigo
          FROM stna_gestion.bodegas_movimientos AS bm2
          JOIN stna_gestion.insumos_venta AS iv2 ON bm2.codigo = iv2.codigo
          WHERE bm2.Entrada != '0.00'
          GROUP BY iv2.codigo
        )
    ) AS bm ON insumos_venta.codigo = bm.codigo
  WHERE
    insumos_venta.categoria NOT IN (152, 154)
  GROUP BY 
    insumos_venta.codigo, 
    insumos_venta.Nombre, 
    insumos_venta.cod_barra, 
    categorias.Categoria, 
    Round(precio, 0), 
    Round(precio * 1.19, 1), 
    insumos_venta.activo,
    bm.NombreBodega,
    bm.Numero_Transaccion,
    bm.Entrada,
    bm.Fecha,
    bm.Encargado,
    bm.PMP`;
    try {
      const [productos] = await conexionDB.query(consulta);
      return productos
    } catch (error) {
        console.log(error)
        throw 'No se pudo obtener movimientos de bodega'
    } finally {
        conexionDB.release();
    }
}

module.exports = {verMovimientosBodega, getProductosConBodega}
