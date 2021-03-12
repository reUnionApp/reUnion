const Sequelize = require("sequelize");
const db = require("../db");

const Activity = db.define("Activity", {
  activityName: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  location: {
    type: Sequelize.TEXT,
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  endDate: {
    type: Sequelize.DATEONLY,
  },
  startTime: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  endTime: {
    type: Sequelize.STRING,
  },
});

module.exports = Event;
