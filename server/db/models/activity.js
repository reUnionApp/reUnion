const Sequelize = require('sequelize');
const db = require('../db');

const Activity = db.define(
  'Activities',
  {
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
    startDateTime: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    endDateTime: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
);

module.exports = Activity;
