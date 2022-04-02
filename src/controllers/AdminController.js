const Users = require('../data/model/user.model');
const Products = require('../data/model/product.model');

exports.page = (req, res, next) => {
  res.json({
    page: 'Admin Page'
  })
}