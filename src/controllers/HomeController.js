const Users = require('../data/model/user.model');
const Products = require('../data/model/product.model');

exports.page = async (req, res, next, errorMessage = '') => {
  try {
    const products = await Products.findAll({ include: Users });
    const isLoggedIn = !!req.user;
    const username = isLoggedIn ? req.user.name : '';

    res.render('shop', {
      pageTitle: 'Online Shop',
      prods: products || [],
      pagePath: '/',
      isLoggedIn: isLoggedIn,
      message: errorMessage,
      username: username,
      userId: !!req.user ? req.user.id : 0 
    })
  } 
  catch (error) {
    console.log(error.message);
  }
}