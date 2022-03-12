const Products = require('../data/migrations/products');

const add = async (req, res, next) => {
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
        await Products.create({title,price,description});
        res.status(201).redirect('/');
    } catch (error) {
        throw new Error(error);
    }
}

const deleteAll = async (req, res, next) => {
    try {
        await Products.deleteAll();
        res.status(201).redirect('/');
    } catch (error) {
        throw new Error(error);   
    }
}

const page = (req, res, next) => {
    const respone = {
        pageTitle: 'Add Products',
        pagePath: '/admin/add-product'
    }

    res.status(200).render('add-product', respone)
}

module.exports = {
    page,
    add,
    deleteAll
}