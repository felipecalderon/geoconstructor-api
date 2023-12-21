const pool = require('../database')

const verMovimientosBodega = async (codigoProducto) => {
    const conexionDB = await pool.getConnection();
    try {
        const consulta = `SELECT *
        FROM stna_gestion.bodegas_movimientos AS bm
        JOIN stna_gestion.insumos_venta AS iv ON bm.codigo = iv.codigo
        WHERE iv.codigo = ${codigoProducto};`
        const [productos] = await conexionDB.query(consulta);
        const detalleMovmiento = []
        if(productos.length > 0){
            for (const producto of productos) {
                const cliente = await verPreventaDetalle(producto.preventa);
                let detalleCliente = cliente ? cliente : []
                const union = { ...producto, ...detalleCliente[0] };
                detalleMovmiento.push(union);
            }
        }
        return detalleMovmiento
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

let data = `xml version="1.0" encoding="ISO-8859-1"?>
<EnvioBOLETA xmlns="http://www.sii.cl/SiiDte" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0" xsi:schemaLocation="http://www.sii.cl/SiiDte EnvioBOLETA_v11.xsd">
<SetDTE ID="SetDoc">
<Caratula version="1.0">
<RutEmisor>76694449-3</RutEmisor>
<RutEnvia>15230250-9</RutEnvia>
<RutReceptor>60803000-K</RutReceptor>
<FchResol>2014-08-22</FchResol>
<NroResol>80</NroResol>
<TmstFirmaEnv>2023-12-20T18:26:58</TmstFirmaEnv>
<SubTotDTE>
<TpoDTE>39</TpoDTE>
<NroDTE>1</NroDTE>
</SubTotDTE>
</Caratula>
<DTE version="1.0">
<Documento ID="F43641T">
<Encabezado>
<IdDoc>
<TipoDTE>39</TipoDTE>
<Folio>43641</Folio>
<FchEmis>2023-12-20</FchEmis>
<IndServicio>3</IndServicio>
</IdDoc>
<Emisor>
<RUTEmisor>76694449-3</RUTEmisor>
<RznSocEmisor>Sociedad Comercial Geobosques SPA</RznSocEmisor>
<GiroEmisor>COM.MADERA LENA CARBON Y DERIB. FAB.VTA. PROD. MADERA</GiroEmisor>
<DirOrigen>Avenida Pedro de Valdivia N 03880</DirOrigen>
<CmnaOrigen>Temuco</CmnaOrigen>
<CiudadOrigen>Temuco</CiudadOrigen>
</Emisor>
<Receptor>
<RUTRecep>66666666-6</RUTRecep>
<RznSocRecep>RUT GENERICO</RznSocRecep>
</Receptor>
<Totales>
<MntNeto>5025</MntNeto>
<IVA>955</IVA>
<MntTotal>5980</MntTotal>
</Totales>
</Encabezado>
<Detalle>
<NroLinDet>1</NroLinDet>
<CdgItem>
<TpoCodigo>INT1</TpoCodigo>
<VlrCodigo>3319</VlrCodigo>
</CdgItem>
<NmbItem>SELLADOR ACRILICO PINTABLE 280ML BLANCO WURTH</NmbItem>
<QtyItem>2</QtyItem>
<UnmdItem>UN</UnmdItem>
<PrcItem>2990</PrcItem>
<MontoItem>5980</MontoItem>
</Detalle>
<TED version="1.0">
<DD>
<RE>76694449-3</RE>
<TD>39</TD>
<F>43641</F>
<FE>2023-12-20</FE>
<RR>66666666-6</RR>
<RSR>RUT GENERICO</RSR>
<MNT>5980</MNT>
<IT1>SELLADOR ACRILICO PINTABLE 280ML BLANCO </IT1>
<CAF version="1.0">
<DA>
<RE>76694449-3</RE>
<RS>SOCIEDAD COMERCIAL GEOBOSQUES SPA</RS>
<TD>39</TD>
<RNG>
<D>40001</D>
<H>45000</H>
</RNG>
<FA>2023-08-01</FA>
<RSAPK>
<M>ucKfAiqqxtYCJ4wWZGz0rlKT88gdhzuZAHHe+vbuvASZXxqj8RuLWKvocleghgHJHQVnp3k+37haTwJulPnDkw==</M>
<E>Aw==</E>
</RSAPK>
<IDK>300</IDK>
</DA>
<FRMA algoritmo="SHA1withRSA">TgbU/Qj/MXjCAgmxcw6x0QR0xUeqRcyIgFMMqrxzCN1f27W7bsuhlIZclSzNMT1jYx9JDFPuVwc49tFsiPUyFQ==</FRMA>
</CAF>
<TSTED>2023-12-20T18:26:58</TSTED>
</DD>
<FRMT algoritmo="SHA1withRSA">TXNS3BpkJho3kp+DgvYDx0hZWtY7eEhYpHYTL328hYCDU8R00f7MjW83X+54ZaYJmD3HrLvHoc2YqMbepmzwCg==</FRMT>
</TED>
<TmstFirma>2023-12-20T18:26:58</TmstFirma>
</Documento>
<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
<SignedInfo>
<CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"></CanonicalizationMethod>
<SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"></SignatureMethod>
<Reference URI="#F43641T">
<Transforms>
<Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"></Transform>
</Transforms>
<DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod>
<DigestValue>ytovrqXfIyBYzTbJ3TIhTzaee3s=</DigestValue>
</Reference>
</SignedInfo>
<SignatureValue>imul0xQfZyel5eEckOitTdTCHQb4lT6WrEZ1D7Ho/GswNMSp4Pv1/8XSGInh3wYmsPACxHJ3Tyvd
iehfqEn2q9q18LxOiTwAa9GXzp3oO0XhKqxJ+XfEzWbuPJAbkPBINrh2CSVVfn4gkbT1lJORwmmV
V1tOMQX2tXA1XT1C73g=</SignatureValue>
<KeyInfo>
<KeyValue>
<RSAKeyValue>
<Modulus>wH0lni0O2/A3Kv2kV0YLvz1gLpOmXtEWVFV7XeCuzf94pypoIYQ+TN0kDpjRrb+haRhTM7ZssDHG
c/MAB0ZwoE8Dur7Qnfx9g/M/epHflny+jTu+Vo6x1kb2Fc1kr5tZFvfYjDYm70iQ2YWIKbwHC4e2
akjB8WI6zEof1C8gfrs=</Modulus>
<Exponent>AQAB</Exponent>
</RSAKeyValue>
</KeyValue>
<X509Data>
<X509Certificate>MIIGRzCCBS+gAwIBAgIKF4i1SgAAABYe6zANBgkqhkiG9w0BAQUFADCB0jELMAkGA1UEBhMCQ0wx
HTAbBgNVBAgTFFJlZ2lvbiBNZXRyb3BvbGl0YW5hMREwDwYDVQQHEwhTYW50aWFnbzEUMBIGA1UE
ChMLRS1DRVJUQ0hJTEUxIDAeBgNVBAsTF0F1dG9yaWRhZCBDZXJ0aWZpY2Fkb3JhMTAwLgYDVQQD
EydFLUNFUlRDSElMRSBDQSBGSVJNQSBFTEVDVFJPTklDQSBTSU1QTEUxJzAlBgkqhkiG9w0BCQEW
GHNjbGllbnRlc0BlLWNlcnRjaGlsZS5jbDAeFw0yMTA4MTYyMzE0NTBaFw0yNDA4MTUyMzE0NTBa
MIHIMQswCQYDVQQGEwJDTDEWMBQGA1UECAwNTEEgQVJBVUNBTsONQTEQMA4GA1UEBwwHQ0FVVMON
TjEsMCoGA1UEChMjU09DSUVEQUQgQ09NRVJDSUFMIEdFT0JPU1FVRVMgTFREQSAxCjAIBgNVBAsM
ASoxKzApBgNVBAMTIlBJRVJBTkdFTE8gQ09OVEFSRE8gRlVMR0VSSSBJVUJJTkkxKDAmBgkqhkiG
9w0BCQEWGUNPTlRBQ1RPQERFQi1BU0VTT1JJQVMuQ0wwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJ
AoGBAMB9JZ4tDtvwNyr9pFdG`

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
