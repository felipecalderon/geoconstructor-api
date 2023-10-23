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

const ventasProductos = async () => {
    const conexionDB = await pool.getConnection();
    const consulta = `
        SELECT *
        FROM stna_gestion.bodegas_movimientos
        ORDER BY Fecha DESC
        LIMIT 4000`;
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

module.exports = {verMovimientosBodega, ventasProductos}
