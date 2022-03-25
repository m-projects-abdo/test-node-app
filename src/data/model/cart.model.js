const SQL = require('sequelize');
const DB = require('../../util/connection');

const Cart = DB.define('cart', {
  id: {
    type: SQL.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
});

module.exports = Cart;