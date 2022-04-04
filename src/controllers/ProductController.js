const Product = require('../data/model/product.model');
const User = require('../data/model/user.model');
const AppError = require('../util/errors-handling/app.error');

exports.page = (req, res, next) => {
    res.status(200).render('add-product', {
        pageTitle: 'Add Products',
        pagePath: '/product',
    });
}

exports.details = async (req, res, next) => {
    try {
      const productId = req.params.id;
      const productDetails = await Product.findOne({where: {id: productId}, include: User})
  
      if(!productDetails) req.flash('error', [{message: 'Internal server error'}]);
  
      res.render('product-details', {
        pageTitle: 'Product Details',
        pagePath: '',
        product: productDetails,
        userId: !!req.user ? req.user.id : 0 
      })
    }
    catch(err) {
        console.log(err.message);
    }
}

exports.create = async (req, res, next) => {
    const {title, price, description} = req.body;
    
    try {
        if (!title || !price || !description) throw new AppError([{message:'Please add product details.'}])
        if (!req.user) throw new AppError([{message:'You need to login.'}]);

        const product = await req.user.createProduct({title,price,description});
        if(!product) throw new AppError([{message:'Internal server error'}])

        res.status(201).redirect('/');
    } catch (error) {
        req.flash('error', error.errors);
        res.redirect(error.statusCode, '/product')
    }
}

exports.drop = async (req, res, next) => {
    try {
        await Product.set([]);
        res.status(200).redirect('/');
    } catch (error) {
        console.log(error);   
    }
}