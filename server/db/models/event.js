const Sequelize = require('sequelize');
const db = require('../db');

const Event = db.define(
  'Events',
  {
    eventName: {
      type: Sequelize.TEXT,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // eventType: {
    //   type: Sequelize.TEXT(
    //     Sequelize.ENUM({
    //       values: [
    //         'class reunion',
    //         'family reunion',
    //         'anniversary party',
    //         'baby shower',
    //         'other gathering',
    //       ],
    //     })
    //   ),
    //   allowNull: false,
    // },
    eventType: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    owner: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ownerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // coordinator: {
    //   type: Sequelize.ARRAY(
    //     Sequelize.TEXT({
    //       values: [],
    //     })
    //   ),
    // },
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

module.exports = Event;
