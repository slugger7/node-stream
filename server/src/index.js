const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { connectGraph } = require('./graph');
const { services } = require("./services");

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

const port = process.env.PORT || 3000;

connectGraph(app);
services(app);

app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});