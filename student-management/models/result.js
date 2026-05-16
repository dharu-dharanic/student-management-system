const { DataTypes } =
  require("sequelize");

const sequelize =
  require("../config/db");

const Student =
  require("./student");

/* ---------- MODEL ---------- */

const Result =
  sequelize.define("Result", {

    subject: {

      type: DataTypes.STRING,

      allowNull: false

    },

    marks: {

      type: DataTypes.INTEGER,

      allowNull: false

    },

    grade: {

      type: DataTypes.STRING,

      allowNull: false

    }

});

/* ---------- ASSOCIATIONS ---------- */

Student.hasMany(Result, {
  foreignKey: "studentId"
});

Result.belongsTo(Student, {
  foreignKey: "studentId"
});

module.exports =
  Result;