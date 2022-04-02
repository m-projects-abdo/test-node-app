const SQL = require('sequelize');
const DB = require('../../util/connection');

const Order = DB.define('order', {
  id: {
    type: SQL.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false   
  }
})

module.exports = Order;