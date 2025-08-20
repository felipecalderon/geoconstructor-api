const ngrok = require('@ngrok/ngrok');
const sgMail = require('@sendgrid/mail')
const {fecha} = require('./generafecha')
sgMail.setApiKey(process.env.APIMAIL)

const tunel = async () => {
    try {
      const url = await ngrok.connect({
        authtoken: process.env.NGROK,
        proto: "http",
        addr: process.env.PORT,
        hostname: process.env.HOSTNAME,
      });
      const msg = {
        to: 'admin@geobosques.com',
        from: 'ventas@geoconstructor.cl',
        subject: 'API reiniciada, nuevo link ' + fecha,
        text: 'Información de la API',
        html: `<a href="${url.url()}">Clic aquí para ver link en la nube</a>`,
      }
      await sgMail.send(msg)
      return `Conectado en: ${url.url()}`

      } catch (error) {
        console.error('falló ngrok', error)
        throw new Error('Falló la conexión Ngrok')
      }
}
module.exports = {tunel}