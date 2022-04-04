const AppError = require('../util/errors-handling/app.error');
const Product = require('../data/model/product.model');
const User = require('../data/model/user.model');

exports.page = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const productInCart = await cart.getProducts({include: [{model: User}]});

    res.render('cart', {
      pageTitle: 'My Cart',
      pagePath: '/cart',
      cartProduct: productInCart,
    })
  }
  catch(err) {
    console.log(err.message)
  }
}

exports.add = async (req, res, next) => {
  try {
    let quantity = 1;
    const productId = +req.params.id
    const product = await Product.findByPk(productId);
    
    if(!product) throw new AppError([{message:'Product not found!'}]);
    
    if(req.user.id == product.userId) 
      throw new AppError([{message:'Can\'t add product to cart with the same user'}]);

    const userCart = await req.user.getCart();
    if(!userCart) throw new AppError([{message:'User don\'t have a cart!'}]);
    
    const productInCart = await userCart.getProducts({
      where: {id: productId}
    });
    
    if(productInCart.length > 0) {
      quantity = productInCart[0].cartItem.dataValues.quantity + 1;
    }
    
    await userCart.addProduct(productId, {through: {quantity: quantity}});
    res.redirect('/cart');
  }
  catch(err) {
    req.flash('error', err.errors);
    res.redirect(err.statusCode, '/cart');
  }
}

exports.drop = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productsInCart = await (await req.user.getCart())
      .getProducts({ where: {id: productId} });
    
    if(productsInCart.length == 0) 
      throw new AppError([{message:'Product not found!'}]); 

    await productsInCart[0].cartItem.destroy();
    res.redirect('/cart');
  } 
  catch (err) {
    req.flash('error', err.errors);
    res.redirect(err.statusCode, '/cart');
    console.log(err.errors);
  }
}

exports.get = async (req, res, next) => {}