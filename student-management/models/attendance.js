const { DataTypes } =
  require("sequelize");

const sequelize =
  require("../config/db");

const Student =
  require("./student");

/* ---------- MODEL ---------- */

const Attendance =
  sequelize.define("Attendance", {

    status: {

      type: DataTypes.STRING,

      allowNull: false

    },

    date: {

      type: DataTypes.DATEONLY,

      allowNull: false

    }

});

/* ---------- ASSOCIATION ---------- */

Student.hasMany(Attendance);

Attendance.belongsTo(Student);

module.exports =
  Attendance;