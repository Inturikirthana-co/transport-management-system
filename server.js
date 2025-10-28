const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Dummy in-memory database (replace with real DB later if needed)
const users = [{ username: "admin", password: "admin123" }];

// ✅ LOGIN ROUTE
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username);

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
  } else {
    res.status(401).send("<h2>Invalid username or password</h2>");
  }
});

// ✅ SIGNUP ROUTE
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  console.log("Signup attempt:", username);

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    res.status(400).send("<h2>User already exists. Please login.</h2>");
  } else {
    users.push({ username, password });
    console.log("User registered:", username);
    res.sendFile(path.join(__dirname, "public", "login.html"));
  }
});

// ✅ Default routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Server running successfully on Render!" });
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
