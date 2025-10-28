// routers/driverRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Fetch driver details for a given vehicle
router.get('/:vehicleId', (req, res) => {
  const { vehicleId } = req.params;
  const sql = "SELECT * FROM drivers WHERE vehicle_id = ?";
  db.query(sql, [vehicleId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

module.exports = router;
