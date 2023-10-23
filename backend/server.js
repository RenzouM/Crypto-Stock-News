require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());

const port = 3002;

app.listen(port, () => {
  console.log("Server corriendo en el puerto " + port + " !");
});
