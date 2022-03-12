const { getProducts, getProfile } = require('../controllers/AdminController');
const express = require('express');
const router = express.Router();

router.get('/', getProducts);
router.post('/profile', getProfile);

module.exports = router;