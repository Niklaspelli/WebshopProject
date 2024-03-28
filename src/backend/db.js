import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const filePath = "../../data/db.json";

// Route to handle GET request for JSON data
app.get("/products", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData); // Send JSON response
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      res.status(500).send("Error parsing JSON data");
    }
  });
});

// Route to handle GET request for a specific product by ID
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const product = jsonData.PRODUCTS.find(
        (product) => product.id === productId
      );

      if (product) {
        res.json(product); // Send JSON response for the found product
      } else {
        res.status(404).json({ error: "Product not found" }); // Return 404 if product not found
      }
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      res.status(500).send("Error parsing JSON data");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/* const database = createConnection({
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
}); */
