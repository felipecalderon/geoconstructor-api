const ngrok = require('ngrok');
const sgMail = require('@sendgrid/mail')
const {fecha} = require('./generafecha')
sgMail.setApiKey(process.env.APIMAIL)

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error.response.body)
//   })

const tunel = async () => {
    try {
      const url = await ngrok.connect({
        authtoken: process.env.NGROK,
        proto: "http",
        addr: process.env.PORT,
        hostname: 'cunning-stingray-trusty.ngrok-free.app',
      });
      const msg = {
        to: 'admin@geobosques.com', // Change to your recipient
        from: 'ventas@geoconstructor.cl', // Change to your verified sender
        subject: 'API reiniciada, nuevo link ' + fecha,
        text: 'Información de la API',
        html: `<a href="${url}">Clic aquí para ver link en la nube</a>`,
      }
      const notificacion = await sgMail.send(msg)
      return `Conectado en: ${url}`

      } catch (error) {
        console.error('falló ngrok', error)
        throw new Error('Falló la conexión Ngrok')
      }
}
module.exports = {tunel}