const Products = require('../data/migrations/products');

exports.add = async (req, res, next) => {
    const {title, price, description} = req.body;
    
    if (!title || !price || !description) {
        res.status(201).render('add-product', {
            pageTitle: 'Add Products',
            message: 'Please Add some Data',
            status: 'warning',
            errorCode: 1
        });
    } 
    
    try {
        if (!req.user) {
            return res.render('add-product', {
                pageTitle: 'Add Products',
                pagePath: '/admin/add-product',
                message: 'You need to log in.',
                isLoggedIn: !!req.user
            });
        }
        const ownerName = req.user.name
        await Products.create({title,price,description,ownerName});
        res.status(201).redirect('/');
    } catch (error) {
        throw new Error(error);
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        await Products.deleteAll();
        res.status(201).redirect('/');
    } catch (error) {
        throw new Error(error);   
    }
}

exports.page = (req, res, next) => {
    res.status(200).render('add-product', {
        pageTitle: 'Add Products',
        pagePath: '/admin/add-product',
        message: '',
        isLoggedIn: !!req.user
    });
}