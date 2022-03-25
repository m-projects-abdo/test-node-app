const Product = require('../data/model/product.model');
const User = require('../data/model/user.model');

exports.page = (req, res, next) => {
    res.status(200).render('add-product', {
        pageTitle: 'Add Products',
        pagePath: '/admin/add-product',
        message: '',
        isLoggedIn: !!req.user,
        username: !!req.user ? req.user.name : ''
    });
}

exports.details = async (req, res, next) => {
    try {
      const productId = req.params.id;
      const productDetails = await Product.findOne({where: {id: productId}, include: User})
  
      if(!productDetails) throw new Error('Internal server error');
  
      res.render('product-details', {
        pageTitle: 'Product Details',
        pagePath: '',
        isLoggedIn: !!req.user,
        product: productDetails,
        username: !!req.user ? req.user.name : ''
      })
    }
    catch(err) {
        console.log(err.message);
    }
}

exports.create = async (req, res, next) => {
    const {title, price, description} = req.body;
    
    try {
        if (!title || !price || !description) throw new Error('Please add product details.')
        if (!req.user) throw new Error('You need to login.');

        const product = await req.user.createProduct({title,price,description});
        if(!product) throw new Error('Internal server error')

        res.status(201).redirect('/');
    } catch (error) {
        res.render('add-product', {
            pageTitle: 'Add Products',
            pagePath: '/admin/add-product',
            message: error.message,
            isLoggedIn: !!req.user,
            username: !!req.user ? req.user.name : ''
        });
    }
}

exports.drop = async (req, res, next) => {
    try {
        await Product.set([]);
        res.status(201).redirect('/');
    } catch (error) {
        console.log(error);   
    }
}