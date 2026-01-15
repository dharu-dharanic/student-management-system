const sequelize = require("./config/db");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Working");
    process.exit();
  } catch (e) {
    console.error(e);
  }
})();
