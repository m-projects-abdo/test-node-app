const Users = require('../data/migrations/users');
const Products = require('../data/migrations/products');

exports.getProducts = async (req, res, next, errorMessage = '') => {
  try {
    let products = await Products.findAll({ include: Users });
    
    res.render('shop', {
      pageTitle: 'Online Shop',
      prods: products || [],
      pagePath: '/',
      isLoggedIn: !!req.user,
      message: errorMessage,
      username: !!req.user ? req.user.name : ''
    })
  } catch (error) {
    console.log(error);
  }
}

exports.getProfile = async (req, res, next) => {
    try {
        const userProduct = await req.user.getProducts();        
        return res.status(200).render('profile', {
          pageTitle: req.user.name,
          pagePath: '/profile',
          isLoggedIn: !!req.user,
          data: req.user,
          products: userProduct,
          username: req.user.name
        });
    } catch (error) {
        console.log(error);
    }
}

exports.getCurrentUser = async (req, res, next) => {
  try {
    if(!req.user) throw new Error();
      
    return res.status(200).json({
      message: `Welcome ${req.user.name} to your community.`,
      data: {
        ...req.user.dataValues
      }
    });
  } catch (error) {
      res.status(300).redirect('/');
  }
}