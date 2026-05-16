const express = require("express");

const router = express.Router();

const controller =
  require("../controllers/studentController");

const validateStudent =
  require("../middleware/validateStudent");

/* ---------- CREATE ---------- */

router.post(
  "/",
  validateStudent,
  controller.createStudent
);

/* ---------- READ ---------- */

router.get(
  "/",
  controller.getAllStudents
);

/* ---------- UPDATE ---------- */

router.put(
  "/:id",
  validateStudent,
  controller.updateStudent
);

/* ---------- DELETE ---------- */

router.delete(
  "/:id",
  controller.deleteStudent
);

module.exports = router;