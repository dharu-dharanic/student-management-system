const Class = require("../models/class");

/* ---------- CREATE CLASS ---------- */

exports.createClass = async (req, res) => {

  try {

    const { name } = req.body;

    if (!name || name.trim() === "") {

      return res.status(400).json({

        message: "Class name is required"

      });

    }

    const existingClass =
      await Class.findOne({

        where: {
          name: name.trim()
        }

      });

    if (existingClass) {

      return res.status(400).json({

        message: "Class already exists"

      });

    }

    const newClass =
      await Class.create({

        name: name.trim()

      });

    res.status(201).json(newClass);

  } catch(error) {

    res.status(500).json({

      message: error.message

    });

  }

};

/* ---------- GET ALL CLASSES ---------- */

exports.getAllClasses = async (req, res) => {

  try {

    const classes =
      await Class.findAll({

        order: [["id", "ASC"]]

      });

    res.json(classes);

  } catch(error) {

    res.status(500).json({

      message: error.message

    });

  }

};

/* ---------- UPDATE CLASS ---------- */

exports.updateClass = async (req, res) => {

  try {

    const cls =
      await Class.findByPk(
        req.params.id
      );

    if (!cls) {

      return res.status(404).json({

        message: "Class not found"

      });

    }

    const { name } = req.body;

    if (!name || name.trim() === "") {

      return res.status(400).json({

        message: "Class name is required"

      });

    }

    await cls.update({

      name: name.trim()

    });

    res.json(cls);

  } catch(error) {

    res.status(500).json({

      message: error.message

    });

  }

};

/* ---------- DELETE CLASS ---------- */

exports.deleteClass = async (req, res) => {

  try {

    const cls =
      await Class.findByPk(
        req.params.id
      );

    if (!cls) {

      return res.status(404).json({

        message: "Class not found"

      });

    }

    await cls.destroy();

    res.json({

      message: "Class deleted successfully"

    });

  } catch(error) {

    res.status(500).json({

      message: error.message

    });

  }

};