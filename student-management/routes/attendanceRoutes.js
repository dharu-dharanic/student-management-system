const express =
  require("express");

const router =
  express.Router();

const controller =
  require("../controllers/attendanceController");

/* ---------- CREATE ---------- */

router.post(
  "/",
  controller.markAttendance
);

/* ---------- GET ---------- */

router.get(
  "/",
  controller.getAttendance
);

module.exports =
  router;