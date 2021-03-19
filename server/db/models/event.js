const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define(
  "Event",
  {
    eventName: {
      type: Sequelize.TEXT,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    eventType: {
      type: Sequelize.ARRAY(
        Sequelize.ENUM({
          values: [
            "class reunion",
            "family reunion",
            "anniversary party",
            "baby shower",
            "other gathering",
          ],
        })
      ),
      allowNull: false,
    },
    owner: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    coordinator: {
      type: Sequelize.ARRAY(
        Sequelize.TEXT({
          values: [],
        })
      ),
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    location: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
);

module.exports = Event;
