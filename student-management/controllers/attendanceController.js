const Attendance =
  require("../models/attendance");

const Student =
  require("../models/student");

/* ---------- CREATE ---------- */

exports.markAttendance =
  async (req, res) => {

    try {

      const {
        studentId,
        status,
        date
      } = req.body;

      /* ---------- VALIDATION ---------- */

      if (
        !studentId ||
        !status ||
        !date
      ) {

        return res.status(400).json({

          message:
            "All fields are required"

        });

      }

      /* ---------- VALID STATUS ---------- */

      const validStatus =
        ["Present", "Absent"];

      if (
        !validStatus.includes(status)
      ) {

        return res.status(400).json({

          message:
            "Invalid attendance status"

        });

      }

      /* ---------- CHECK STUDENT ---------- */

      const student =
        await Student.findByPk(
          studentId
        );

      if (!student) {

        return res.status(404).json({

          message:
            "Student not found"

        });

      }

      /* ---------- PREVENT DUPLICATE ---------- */

      const existingAttendance =
        await Attendance.findOne({

          where: {
            studentId,
            date
          }

        });

      if (existingAttendance) {

        return res.status(400).json({

          message:
            "Attendance already marked for this date"

        });

      }

      /* ---------- CREATE ---------- */

      const attendance =
        await Attendance.create({

          studentId,
          status,
          date

        });

      res.status(201).json({

        message:
          "Attendance marked successfully",

        attendance

      });

    } catch(error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};

/* ---------- GET ---------- */

exports.getAttendance =
  async (req, res) => {

    try {

      const records =
        await Attendance.findAll({

          include: [
            {
              model: Student
            }
          ],

          order: [
            ["date", "DESC"]
          ]

        });

      res.status(200).json(
        records
      );

    } catch(error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};