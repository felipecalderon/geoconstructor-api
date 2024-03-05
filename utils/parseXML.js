const xml2js = require('xml2js');
const parser = new xml2js.Parser();

const parseXML = async (xmlString) => {
    if(!xmlString) return null
    try {
        const result = await new Promise((resolve, reject) => {
            parser.parseString(xmlString, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        const [boleta] = result.xml.EnvioBOLETA
        const [setDTE] = boleta.SetDTE
        const [dte] = setDTE.DTE

        return dte;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {parseXML}