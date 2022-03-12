const products = require('../migrations/products');
products.destroy({
  where: {},
  truncate: true
});