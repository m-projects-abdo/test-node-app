const { productPage, cartPage, add, deleteAll } = require('../controllers/ProductsController');
const { isNotAuthorize } = require('../util/middleware/auth.middleware');

const express = require('express');
const router = express.Router();

router.get('/add-product', isNotAuthorize, productPage);
router.get('/cart', isNotAuthorize, cartPage);
router.post('/add-product', add);
router.post('/products/delete', deleteAll);

module.exports = router;