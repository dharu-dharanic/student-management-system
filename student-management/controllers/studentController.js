const Student = require("../models/student");
const Class = require("../models/class");
const { Op } = require("sequelize");

// Create student
exports.createStudent = async (req, res) => {
  try {
    const { name, email, age, classId } = req.body;

    if (!name || !email || !age || !classId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = await Student.create({ name, email, age, classId });
    res.status(201).json(student);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all students with search, sort, pagination
exports.getAllStudents = async (req, res) => {
  try {
    const { search, sort, order, page = 1, limit = 5 } = req.query;

    let where = {};
    let orderBy = [];

    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    if (sort) {
      orderBy.push([sort, order === "desc" ? "DESC" : "ASC"]);
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Student.findAndCountAll({
      where,
      include: Class,
      order: orderBy,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      students: rows
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.update(req.body);
    res.json(student);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.destroy();
    res.json({ message: "Student deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
