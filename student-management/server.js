const express =
  require("express");

const cors =
  require("cors");

require("dotenv").config();

const sequelize =
  require("./config/db");

/* ---------- LOAD MODELS ---------- */

require("./models/class");

require("./models/student");

require("./models/attendance");

require("./models/result");

/* ---------- IMPORT ROUTES ---------- */

const studentRoutes =
  require("./routes/studentRoutes");

const classRoutes =
  require("./routes/classRoutes");

const attendanceRoutes =
  require("./routes/attendanceRoutes");

const resultRoutes =
  require("./routes/resultRoutes");

/* ---------- APP ---------- */

const app = express();

/* ---------- MIDDLEWARE ---------- */

app.use(cors());

app.use(express.json());

/* ---------- ROUTES ---------- */

app.use(
  "/students",
  studentRoutes
);

app.use(
  "/classes",
  classRoutes
);

app.use(
  "/attendance",
  attendanceRoutes
);

app.use(
  "/results",
  resultRoutes
);

/* ---------- HOME ROUTE ---------- */

app.get("/", (req, res) => {

  res.json({

    message:
      "Student Management System API Running"

  });

});

/* ---------- GLOBAL ERROR HANDLER ---------- */

app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).json({

    message:
      "Something went wrong"

  });

});

/* ---------- DATABASE ---------- */

sequelize.sync()

  .then(() => {

    console.log(
      "Database ready"
    );

    app.listen(
      process.env.PORT,
      () => {

        console.log(
          "Server running on port " +
          process.env.PORT
        );

      }
    );

  })

  .catch(error => {

    console.log(error);

  });