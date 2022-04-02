const SQL = require('sequelize');
const DB = require('../../util/connection');

const OrderItem = DB.define('orderItem', {
  id: {
    type: SQL.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false   
  },
  quantity: {
    type: SQL.INTEGER
  }
})

module.exports = OrderItem;