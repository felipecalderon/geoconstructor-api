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
        console.log(error);
        throw 'No se pudo obtener movimientos de bodega'
    } finally {
        conexionDB.release();
    }
}

const verPreventaDetalle = async (preventa) => {
    const conexionDB = await pool.getConnection();
    if(!preventa) return null
    try {
        const consulta = `SELECT *
        FROM stna_gestion.doc_compra_venta AS dv
        JOIN stna_gestion.clientes_proveedores AS cp ON dv.Empresa = cp.cod_empresa
        WHERE dv.preventa = ${preventa}`

        const [preventaDetalle] = await conexionDB.query(consulta);
        return preventaDetalle
    } catch (error) {
        throw error
    } finally {
        conexionDB.release();
    }
}

const formatoFecha = (fecha) => {
    console.log({fecha});
    const dia = fecha.getUTCDate().toString().padStart(2, '0'); 
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0'); 
    const ano = fecha.getUTCFullYear(); 
    return `${ano}-${mes}-${dia}`;
}

const ventasProductos = async (fechaDesde, fechaHasta) => {
    const ahora = new Date();
    const fechaUTC = new Date(Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate(), ahora.getUTCHours() - 3));
    const desde = !fechaDesde ? formatoFecha(fechaUTC) : fechaDesde
    const hasta = !fechaHasta ? formatoFecha(fechaUTC) : fechaHasta
    // console.log({desde, hasta})
    const conexionDB = await pool.getConnection();
    const consulta = `
        SELECT *
        FROM stna_gestion.bodegas_movimientos
        JOIN stna_gestion.insumos_venta ON bodegas_movimientos.codigo = insumos_venta.codigo
        WHERE bodegas_movimientos.Fecha >= "${desde}" AND bodegas_movimientos.Fecha <= "${hasta}"
        ORDER BY Numero_Transaccion DESC
    `;
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

module.exports = {verMovimientosBodega, ventasProductos, verPreventaDetalle}
