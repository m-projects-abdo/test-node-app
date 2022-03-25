const SQL = require('sequelize');
const db = require('../../util/connection');

const User = db.define('user', {
  id: {
    type: SQL.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: SQL.STRING,
    allowNull: false,
  },
  email: {
    type: SQL.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: SQL.STRING,
    allowNull: false
  }
});

module.exports = User;