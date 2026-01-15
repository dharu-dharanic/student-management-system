const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");

// Load models
require("./models/class");
require("./models/student");

// Import routes
const studentRoutes = require("./routes/studentRoutes");
const classRoutes = require("./routes/classRoutes");

const app = express();

// Middleware
app.use(cors());           // Allow all origins
app.use(express.json());    // Parse JSON body

// Routes
app.use("/students", studentRoutes);
app.use("/classes", classRoutes);

// Sync DB and start server
sequelize.sync().then(() => {
  console.log("Database ready");
  app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
  });
});
