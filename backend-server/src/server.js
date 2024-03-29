const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dataRoutes = require("./routes/data_routes");

const app = express();
app.use(cors()); // Use CORS middleware without any restrictions
app.use(bodyParser.json());
app.use("/data", dataRoutes);

module.exports = app;
