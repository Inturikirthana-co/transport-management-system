const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db'); // database connection file
const vehicleRoutes = require('./routers/vehicleRoutes');
const driverRoutes = require('./routers/driverRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/vehicles', vehicleRoutes);
app.use('/drivers', driverRoutes);

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Use Render's provided PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
