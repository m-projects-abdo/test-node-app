// const mySQL = require('mysql2');

// const pool =  mySQL.createPool({
//   host: 'localhost',
//   database: 'test',
//   user: 'root',
//   password: '',
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');
const db = new Sequelize('online-shop', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3307
})

/**
 * test DataBase connection 
 */
// const TESTCONNECTION = async () => {
//   try {
//     await db.authenticate();
//     console.log('connect successfully.');
//   } catch (err) {
//     console.log('Unable to connect to the database:', err);
//   }
// }
// TESTCONNECTION();

module.exports = db;