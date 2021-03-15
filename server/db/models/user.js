const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('User', {
<<<<<<< Updated upstream
=======
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  alias: {
    type: Sequelize.STRING,
    allowNull: true,
  },
>>>>>>> Stashed changes
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password');
    },
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt');
    },
  },
  googleId: {
    type: Sequelize.STRING,
  },
<<<<<<< Updated upstream
=======
  dietaryRestrictions: {
    type: Sequelize.ARRAY(
      Sequelize.ENUM({
        values: [
          'gluten free',
          'vegan',
          'vegetarian',
          'no seafood',
          'peanut allergy',
          'kosher',
          'halal',
          // {
          //   other: {
          //     type: Sequelize.STRING,
          //   },
          // },
        ],
      })
    ),
  },
  specialRequests: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
>>>>>>> Stashed changes
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: false,
  },
  // name: {
  //   type: Sequelize.STRING,
  //   // allowNull: false,
  //   validate: {
  //     notEmpty: true,
  //   },
  // },
  // address: {
  //   type: Sequelize.STRING,
  // },
  // paymentInfo: {
  //   type: Sequelize.STRING,
  //   // validate: {
  //   //   isCreditCard: true
  //   // }
  // },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate((users) => {
  users.forEach(setSaltAndPassword);
});
