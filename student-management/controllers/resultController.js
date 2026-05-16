const Result =
  require("../models/result");

const Student =
  require("../models/student");

/* ---------- CREATE ---------- */

exports.addResult =
  async (req, res) => {

    try {

      const {
        studentId,
        subject,
        marks,
        grade
      } = req.body;

      const result =
        await Result.create({

          studentId,
          subject,
          marks,
          grade

        });

      res.status(201).json(result);

    } catch(error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};

/* ---------- GET ---------- */

exports.getResults =
  async (req, res) => {

    try {

      const results =
        await Result.findAll({

          include: Student

        });

      res.json(results);

    } catch(error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};