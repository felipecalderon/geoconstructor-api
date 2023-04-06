require('dotenv').config()
const express = require('express');
const app = express();
const {tunel} = require('./tunel')
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/", require("./rutas/productos"))

app.listen(PORT, async () => {
  const openconect = await tunel()
  console.log(openconect);
  console.log(`Server running on port ${PORT}`)
});