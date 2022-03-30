const AppError = require('../util/errors-handling/app.error');
const CartItem = require('../data/model/cart-item.model');
const Product = require('../data/model/product.model');
const User = require('../data/model/user.model');

exports.page = async (req, res, next) => {
  try {
    let cart = await req.user.getCart();
    let productInCart = await cart.getProducts({include: [{model: User}]});

    if(productInCart.length == 0) throw new Error('You don\'t have any product in cart.');

    productInCart = productInCart.map(prod => {
      return {
        ...prod.dataValues,
      }
    })

    res.render('cart', {
      pageTitle: 'My Cart',
      pagePath: '/cart',
      cartProduct: productInCart,
      message: '',
      isLoggedIn: !!req.user,
      username: !!req.user ? req.user.name : ''
    })
  }
  catch(err) {
    console.log(err.message)
  }
  
}

exports.create = async (req, res, next) => {
  try {
    let quantity = 1;
    const productId = req.params.id
    const userCart = await req.user.getCart()    
    const product = await Product.findByPk(productId)
    await userCart.addProduct(product, {through: {quantity: quantity}});
    res.redirect('/cart');
    // if() {
    //   quantity++;
    //   await userCart.addProduct(product, {through: {quantity: quantity}});      
    // }
  }
  catch(err) {
    console.log(err.message)
  }
}

exports.get = async (req, res, next) => {}