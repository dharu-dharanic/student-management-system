const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Class = require("./class");

const Student = sequelize.define("Student", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  age: { type: DataTypes.INTEGER, allowNull: false }
});

// Relation: Student belongs to Class
Student.belongsTo(Class, { foreignKey: "classId", onDelete: "SET NULL" });
Class.hasMany(Student, { foreignKey: "classId" });

module.exports = Student;
