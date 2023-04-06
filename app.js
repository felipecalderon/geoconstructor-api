require('dotenv').config()
const express = require('express');
const app = express();
const {tunel} = require('./tunel')
app.use(express.json());

const PORT = process.env.PORT || 3000;
tunel()

app.get('/', async (req, res) => {
  try {
    res.send('api funcionando')
  } catch (error) {
    res.json('no se pudo conectar a ngrok')
  }
})

app.use("/", require("./rutas/productos"))


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));