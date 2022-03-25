const SQL = require('sequelize');
const DB = require('../../util/connection');

const CartItem = DB.define('cartItem', {
  id: {
    type: SQL.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  quantity: {
    type: SQL.INTEGER
  }
});

module.exports = CartItem;