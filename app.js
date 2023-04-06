const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const ngrok = require('ngrok');

ngrok
  .connect({
    authtoken: '2AAB3Mitd1D0oxdxj7Vg6aAM4uY_38DCKQjG8PZvmFWti7Pn7',
    proto: "http",
    addr: PORT,
  })
  .then(url => {
    console.log(`ngrok tunnel: ${url}`);
    app.get("/", (req, res) => {
      res.send(`
      Conectado en: <a href="${url}">Servidor Online</a>
      `)
    })
  })

app.use("/", require("./rutas/productos"))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
