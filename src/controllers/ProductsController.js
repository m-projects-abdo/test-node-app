const Products = require('../data/migrations/products');

exports.add = async (req, res, next) => {
    const {title, price, description} = req.body;
    
    
    try {
        if (!title || !price || !description) throw new Error('Please add product details.')
        if (!req.user) throw new Error('You need to log in.');

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

exports.deleteAll = async (req, res, next) => {
    try {
        await Products.deleteAll();
        res.status(201).redirect('/');
    } catch (error) {
        console.log(error);   
    }
}

exports.productPage = (req, res, next) => {
    res.status(200).render('add-product', {
        pageTitle: 'Add Products',
        pagePath: '/admin/add-product',
        message: '',
        isLoggedIn: !!req.user,
        username: !!req.user ? req.user.name : ''
    });
}

exports.cartPage = (req, res, next) => {
    res.render('cart', {
        pageTitle: 'My Cart',
        pagePath: '/admin/cart',
        message: '',
        isLoggedIn: !!req.user,
        username: !!req.user ? req.user.name : ''
    })
}