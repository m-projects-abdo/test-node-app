// const mySQL = require('mysql2');

// const pool =  mySQL.createPool({
//   host: 'localhost',
//   database: 'test',
//   user: 'root',
//   password: '',
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');
const db = new Sequelize('test', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
})

module.exports = db;