const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const users = [];

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).send("<h2>User already exists. Please login.</h2>");
  }
  users.push({ username, password });
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).send("<h2>Invalid username or password.</h2>");
  }
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

const vehicleData = {
  bus: {
    vehicle: "Bus",
    route: "City Center → Airport",
    driver: "John Doe",
    image: "/images/bus.jpg",
  },
  car: {
    vehicle: "Car",
    route: "Office → Client Site",
    driver: "Alice Brown",
    image: "/images/car.jpg",
  },
  truck: {
    vehicle: "Truck",
    route: "Warehouse → Retail Outlet",
    driver: "Mark Wilson",
    image: "/images/truck.jpg",
  },
  bike: {
    vehicle: "Bike",
    route: "Courier Delivery Zone A",
    driver: "Sarah Lee",
    image: "/images/bike.jpg",
  },
};

app.get("/api/vehicle/:type", (req, res) => {
  const data = vehicleData[req.params.type];
  if (!data) return res.status(404).json({ message: "Vehicle not found" });
  res.json(data);
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
