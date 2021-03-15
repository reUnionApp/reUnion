const Sequelize = require("sequelize");
const db = require("../db");

const User_Event = db.define("User_Event", {
  isOwner: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isCoordinator: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = User_Event;
