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
    try {
        const user = await Users.findOne({where: {email: email}});
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