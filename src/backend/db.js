import express from "express";
import { v4 as uuidv4 } from "uuid";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const usersPath = "../../data/users.json";

app.post("/users", (req, res) => {
  // Extract user data from the request body
  const { user, pwd } = req.body;

  // Perform any necessary validation on the user data
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  // Load existing user data from the JSON file
  fs.readFile(usersPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    try {
      const users = JSON.parse(data);

      // Check if the username already exists
      const existingUser = users.find((u) => u.user === user);
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }

      // Generate a unique ID for the new user
      const userId = uuidv4();

      // Add the new user with unique ID to the list
      users.push({ id: userId, user, pwd });

      // Save the updated user data back to the JSON file
      fs.writeFile(usersPath, JSON.stringify(users), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Error writing file");
        }
        // Send a success response
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

const getUsers = () => {
  const usersData = fs.readFileSync(usersPath);
  return JSON.parse(usersData);
};

// Login endpoint
app.post("/login", (req, res) => {
  const { user, pwd } = req.body;
  const users = getUsers();

  // Find the user in the JSON data
  const matchedUser = users.find((u) => u.user === user && u.pwd === pwd);

  if (matchedUser) {
    // If user is found, return success response with redirect URL
    res
      .status(200)
      .json({ message: "Login successful", redirect: "/dashboard" });
  } else {
    // If user is not found, return error response
    res.status(401).json({ error: "Invalid username or password" });
  }
});

const ordersPath = "../../data/orders.json";

// Route to handle POST requests for orders
app.post("/orders", (req, res) => {
  fs.readFile(ordersPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    try {
      let existingOrders = JSON.parse(data); // Parse existing orders data

      // Check if existing orders is an array
      if (!Array.isArray(existingOrders)) {
        existingOrders = []; // If not, initialize it as an empty array
      }

      // Add the new order to the array
      existingOrders.push(req.body);

      // Write the updated orders data back to the JSON file
      fs.writeFile(ordersPath, JSON.stringify(existingOrders), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Error writing file");
        }
        // Send a success response
        res.status(201).json({ message: "Order placed successfully" });
      });
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      res.status(500).send("Error parsing JSON data");
    }
  });
});

const filePath = "../../data/db.json";

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

// Route att hantera GET request for specifika IDs.

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
