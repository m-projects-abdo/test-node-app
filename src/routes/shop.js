const { page, cartPage, add, deleteAll } = require('../controllers/ProductsController');
const { isAuthorize } = require('../util/middleware/auth.middleware');

const express = require('express');
const router = express.Router();

router.get('/add-product', isAuthorize, page);
router.get('/cart', cartPage);
router.post('/add-product', add);
router.post('/products/delete', deleteAll);

module.exports = router;