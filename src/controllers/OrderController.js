const Product = require('../data/model/product.model');
const AppError = require('../util/errors-handling/app.error');

exports.page = async (req, res, next) => {
  try {
    let productOrdered = [];
    const userOrder = await req.user.getOrder({
      include: [
        {
          model: Product,
          include: ['user']
        }
      ]
    });
    
    // if(userOrder) {
    //   productOrdered = await userOrder.getProducts({
    //     include: ['user']
    //   });
    // }

    res.send(userOrder);

    // res.render('order', {
    //   pagePath: '/order',
    //   pageTitle: 'My Orders',
    //   productOrdered: productOrdered,
    //   message: '',
    //   isLoggedIn: !!req.user,
    //   username: !!req.user ? req.user.name : ''
    // })
  }
  catch(err) {
    console.log(err.message);
  }
}

exports.add = async (req, res, next) => {
  try {
    const userCart = await req.user.getCart();
    let productsInCart = await userCart.getProducts();

    //Check if user have product in cart before added to order
    if(productsInCart.length == 0) 
      throw new AppError([{message:'Can\'t make an order because you don\'t have a product.'}]);
    
    //Create order to store order details
    const userOrder = await req.user.createOrder();

    productsInCart = productsInCart.map(product => {
      product.orderItem = {
        quantity: product.cartItem.quantity
      }
      return product
    });

    await userOrder.addProducts(productsInCart);
    
    //reset products in cart after added to Order list
    await userCart.setProducts([]);

    res.redirect('/order');
  }
  catch(err) {
    req.flash('error', err.errors);
    res.redirect(err.statusCode, '/cart');
    console.log(err.message);
  }
}