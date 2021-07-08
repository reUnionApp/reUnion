const Sequelize = require('sequelize');
const db = require('../db');

const UserEvent = db.define('UserEvent', {
  isOwner: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isCoordinator: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  receivedInvite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  rsvpStatus: {
    type: Sequelize.ENUM('pending', 'accepted', 'declined'),
    defaultValue: 'pending',
    allowNull: false,
  },
});

module.exports = UserEvent;
