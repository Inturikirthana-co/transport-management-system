// routers/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Fetch all vehicles
router.get('/', (req, res) => {
  const sql = "SELECT * FROM vehicles";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
