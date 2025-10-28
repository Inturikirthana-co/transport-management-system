const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const users = [{ username: "admin", password: "admin123" }];

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
  } else {
    res.status(401).send("<h2>Invalid username or password</h2>");
  }
});

// SIGNUP
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    res.status(400).send("<h2>User already exists. Please login.</h2>");
  } else {
    users.push({ username, password });
    res.sendFile(path.join(__dirname, "public", "login.html"));
  }
});

// VEHICLE DETAILS API
const vehicleData = {
  bus: { vehicle: "Bus", route: "City Center to Airport", driver: "John Doe" },
  car: { vehicle: "Car", route: "Office to Client Site", driver: "Alice Brown" },
  truck: { vehicle: "Truck", route: "Warehouse to Retail Outlet", driver: "Mark Wilson" },
  bike: { vehicle: "Bike", route: "Courier Delivery Zone A", driver: "Sarah Lee" },
};

app.get("/api/vehicle/:type", (req, res) => {
  const type = req.params.type.toLowerCase();
  const data = vehicleData[type];
  if (!data) {
    return res.status(404).json({ message: "Vehicle not found" });
  }
  res.json(data);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
