function validateStudent(req, res, next) {

  const {
    name,
    email,
    age,
    classId
  } = req.body;

  /* ---------- VALIDATION ---------- */

  if (
    !name ||
    !email ||
    !age ||
    !classId
  ) {

    return res.status(400).json({
      message: "All fields are required"
    });

  }

  /* ---------- EMAIL ---------- */

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {

    return res.status(400).json({
      message: "Invalid email format"
    });

  }

  /* ---------- AGE ---------- */

  if (age < 1 || age > 100) {

    return res.status(400).json({
      message: "Invalid age"
    });

  }

  next();

}

module.exports =
  validateStudent;