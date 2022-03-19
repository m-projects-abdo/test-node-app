const Products = require('../models/products');
const Users = require('../data/migrations/users');
const ProductsModel = require('../data/migrations/products');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Products.getAll();
        res.status(201).render('shop', {
            pageTitle: 'Online Shop',
            prods: products,
            pagePath: '/',
            isLoggedIn: !!req.user
        })
    } catch (error) {
        throw new Error(error);
    }
}

exports.getProfile = async (req, res, next) => {
    if(!req.user) {
        return res.status(401).redirect('/');
    }
    try {
        const user = await Users.findOne({where: {email: req.user.email}});
        if(!user) return res.status(300).redirect('/');

        const products = await ProductsModel.findAll({where: {ownerName: req.user.name}})

        console.log(products);

        return res.status(200).render('profile', {
            pageTitle: user.dataValues.name,
            pagePath: '/profile',
            isLoggedIn: !!req.user,
            data: user.dataValues,
            products: products
        });
    } catch (error) {
        throw new Error(error);
    }
}

exports.getCurrentUser = async (req, res, next) => {
    if(!req.user) {
        return res.status(401).redirect('/');
    }
    try {
        const user = await Users.findOne({where: {id: req.user.id}});
        if(!user) return res.status(300).redirect('/');
        
        return res.status(200).json({
            message: `Welcome ${user.dataValues.name} to your community.`,
            data: {
                ...user.dataValues
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}