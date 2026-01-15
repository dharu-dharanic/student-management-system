const express = require("express");
const router = express.Router();
const controller = require("../controllers/classController");

// CRUD routes for Classes
router.post("/", controller.createClass);       // Add class
router.get("/", controller.getAllClasses);     // Get all classes
router.put("/:id", controller.updateClass);    // Update class
router.delete("/:id", controller.deleteClass); // Delete class

module.exports = router;
