import express from "express";
import { v4 as uuidv4 } from "uuid";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import fs from "fs";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const usersPathData = "../../data/users.json";
const secretKey = "your_secret_key_here"; // Byt den här till en hemlig nyckel

// Funktion för att generera tokens
function generateToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" }); // Token utgår inom en timma
}

app.get("/users", (req, res) => {
  fs.readFile(usersPathData, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    try {
      const users = JSON.parse(data);
      res.json(users);
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      res.status(500).send("Error parsing JSON data");
    }
  });
});

const usersPath = "../../data/users.json";

app.post("/users", (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  fs.readFile(usersPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    try {
      const users = JSON.parse(data);

      // Kolla om användarnamnet existerar
      const existingUser = users.find((u) => u.user === user);
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }
      //Skapar ett unikt ID för nya användare
      const userId = uuidv4();
      //Lägg till nya användare med unika ID i listan
      users.push({ id: userId, user, pwd });
      //Spara det uppdaterade användardatan till en JSON fil
      fs.writeFile(usersPath, JSON.stringify(users), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Error writing file");
        }
        res
          .status(201)
          .json({ message: "User registered successfully", userId });
      });
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      res.status(500).send("Error parsing JSON data");
    }
  });
});

// Route för användar login
app.post("/login", (req, res) => {
  const { user, pwd } = req.body;

  fs.readFile(usersPathData, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    try {
      const users = JSON.parse(data);

      const matchedUser = users.find((u) => u.user === user && u.pwd === pwd);
      if (matchedUser) {
        const token = generateToken(matchedUser.id);

        res
          .status(200)
          .json({ message: "Login successful", redirect: "/dashboard", token });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      res.status(500).send("Error parsing JSON data");
    }
  });
});

const ordersPath = "../../data/orders.json";
// Route att hanterar POST request för odrar
app.post("/orders", (req, res) => {
  fs.readFile(ordersPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    try {
      let existingOrders = JSON.parse(data);
      // Kolla om det existerar odrar i en array
      if (!Array.isArray(existingOrders)) {
        existingOrders = []; //Om inte, initiera som en tom array
      }

      const orderId = uuidv4(); //Ge unikt ID till varje order

      const newOrder = { orderId: orderId, ...req.body };
      existingOrders.push(newOrder);
      //Skriv uppdaterade ordrarna tillbaka till JSON
      fs.writeFile(ordersPath, JSON.stringify(existingOrders), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Error writing file");
        }

        res
          .status(201)
          .json({ message: "Order placed successfully", orderId: orderId });
      });
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      res.status(500).send("Error parsing JSON data");
    }
  });
});

const productPath = "../../data/db.json";

app.get("/products", (req, res) => {
  fs.readFile(productPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      res.status(500).send("Error parsing JSON data");
    }
  });
});

// Route att hantera GET request för specifika IDs.

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  fs.readFile(productPath, "utf8", (err, data) => {
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
        res.json(product); // Skicka JSON response för den upphittade produkten
      } else {
        res.status(404).json({ error: "Product not found" }); // Retunera 404 om den inte finns
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
