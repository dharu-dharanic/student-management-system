const Class = require("../models/class");

// Create a class
exports.createClass = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Class name is required" });

    const newClass = await Class.create({ name });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll({ order: [["id", "ASC"]] });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update class
exports.updateClass = async (req, res) => {
  try {
    const cls = await Class.findByPk(req.params.id);
    if (!cls) return res.status(404).json({ message: "Class not found" });

    await cls.update({ name: req.body.name });
    res.json(cls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete class
exports.deleteClass = async (req, res) => {
  try {
    const cls = await Class.findByPk(req.params.id);
    if (!cls) return res.status(404).json({ message: "Class not found" });

    await cls.destroy();
    res.json({ message: "Class deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
