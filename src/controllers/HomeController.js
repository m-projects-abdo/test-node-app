const Users = require('../data/model/user.model');
const Products = require('../data/model/product.model');

exports.page = async (req, res, next, errorMessage = '') => {
  try {
    let products = await Products.findAll({ include: Users });
    
    console.log(req.user)

    res.render('shop', {
      pageTitle: 'Online Shop',
      prods: products || [],
      pagePath: '/',
      isLoggedIn: !!req.user,
      message: errorMessage,
      username: !!req.user ? req.user.name : ''
    })
  } 
  catch (error) {
    console.log(error);
  }
}