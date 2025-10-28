const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// ✅ LOGIN ROUTE
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt:", username, password);

  // Dummy credentials
  if (username === "admin" && password === "admin123") {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
  } else {
    res.status(401).send("<h2>Invalid username or password</h2>");
  }
});

// ✅ Test route to confirm backend is working
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running successfully on Render!" });
});

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
