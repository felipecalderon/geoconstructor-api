require('dotenv').config()
const express = require('express');
const app = express();
const {tunel} = require('./tunel')
const cors = require('cors')
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use("/", require("./rutas/productos"))
app.use("/", require("./rutas/variables"))

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`IMPORTANTE: La conexión del servidor local al sitio web está funcionando en esta ventana,
si se cierra esta ventana, volver a abrir el archivo "Iniciar API" en el escritorio, gracias!

Atte: Felipe`)
  try {    
    const openconect = await tunel()
    console.log(openconect);
  } catch (error) {
    console.log(error.message);
  }
});