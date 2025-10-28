const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ LOGIN ROUTE
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simple dummy authentication (replace with DB check)
  if (username === "admin" && password === "admin123") {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
  } else {
    res.status(401).send("<h2>Invalid username or password</h2>");
  }
});

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
