const Products = require('../models/products');
const Users = require('../data/migrations/users');

const getProducts = async (req, res, next) => {
    try {
        const products = await Products.getAll();
        res.status(201).render('shop', {
            pageTitle: 'Online Shop',
            prods: products,
            pagePath: '/'
        })
    } catch (error) {
        throw new Error(error);
    }
}

const getProfile = async (req, res, next) => {
    const {email} = req.body;
    req.session.views += 1 || 1;
    req.session.visitor += 1 || 1;
    req.session.isLoggedIn = true;
    try {
        const user = await Users.findOne({where: {email: email}});
        if(!user) res.status(300).redirect('/');
        
        res.status(200).render('profile', {
            pageTitle: user.dataValues.name,
            pagePath: '/profile',
            data: user.dataValues
        });
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getProducts,
    getProfile
}