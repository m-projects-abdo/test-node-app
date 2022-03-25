const AppError = require('../util/errors-handling/app.error');
const CartItem = require('../data/model/cart-item.model');
const Product = require('../data/model/product.model');

exports.page = (req, res, next) => {
  res.render('cart', {
    pageTitle: 'My Cart',
    pagePath: '/cart',
    message: '',
    isLoggedIn: !!req.user,
    username: !!req.user ? req.user.name : ''
  })
}

exports.create = async (req, res, next) => {
  try {
    let quantity = 1;
    const productId = req.params.id
    const userCart = await req.user.getCart()
    
    if(!userCart) {
      const product = await Product.findByPk(productId)
      await userCart.addProduct(product, {through: {quantity: quantity}});
      res.redirect('/cart');
    } 
    else {
      quantity++;
      await userCart.addProduct(product, {through: {quantity: quantity}});      
    }
  }
  catch(err) {
    console.log(err.message)
  }
}