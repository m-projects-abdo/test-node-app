const Users = require('../data/migrations/users');
const Products = require('../data/migrations/products');

exports.page = (req, res, next) => {
  res.json({
    page: 'Admin Page'
  })
}