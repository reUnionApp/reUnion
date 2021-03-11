const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

let db;

if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    operatorsAliases: 0,
    dialect: 'postgres',
    protocol: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
  });
} else {
  db = new Sequelize(`postgres://localhost:5432/${databaseName}`, {
    logging: false,
  });
}

module.exports = db;
