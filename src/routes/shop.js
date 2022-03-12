const { page, add, deleteAll } = require('../controllers/ProductsController');

const express = require('express');
const router = express.Router();

router.get('/add-product', page);
router.post('/add-product', add);
router.post('/products/delete', deleteAll);

module.exports = router;