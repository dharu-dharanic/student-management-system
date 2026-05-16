const express =
  require("express");

const router =
  express.Router();

const controller =
  require("../controllers/resultController");

/* ---------- CREATE RESULT ---------- */

router.post(
  "/",
  controller.addResult
);

/* ---------- GET RESULTS ---------- */

router.get(
  "/",
  controller.getResults
);

module.exports =
  router;