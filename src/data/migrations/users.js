const SQL = require('sequelize');
const db = require('../../util/connection');

// module.exports = (SQL) => {
//   return {
//     id: {
//       type: SQL.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true
//     },
//     name: {
//       type: SQL.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: SQL.STRING,
//       allowNull: false,
//       unique: true
//     },
//     password: {
//       type: SQL.STRING,
//       allowNull: false
//     }
//   }
// }

const users = db.define('users', {
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

module.exports = users;