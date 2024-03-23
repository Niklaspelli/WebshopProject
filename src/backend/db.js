import express from "express";
import { createConnection } from "mysql";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const database = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "webshop",
});

database.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL connected!");
  }
});

app.get("/products", (req, res) => {
  database.query("SELECT * FROM id", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
