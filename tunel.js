const ngrok = require('ngrok');

const tunel = async () => {
    try {
        const url = await ngrok.connect({
          authtoken: process.env.NGROK,
          proto: "http",
          addr: process.env.PORT,
        });
        console.log(`ngrok tunnel: ${url}`);
        return `Conectado en: <a href="${url}">Servidor Online</a>`

      } catch (error) {
        console.error('Error: ', error);
      }
}
module.exports = {tunel}