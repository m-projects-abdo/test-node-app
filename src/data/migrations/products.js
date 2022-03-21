const Sequelize = require('sequelize');
const db = require('../../util/connection');

const products = db.define('products', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // userId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   unique: true,
  // },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  }
});


module.exports = products;