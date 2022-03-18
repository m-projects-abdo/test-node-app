const { getProducts, getProfile, getCurrentUser } = require('../controllers/AdminController');
const express = require('express');
const router = express.Router();

router.get('/', getProducts);
router.get('/user', getCurrentUser);
router.post('/profile', getProfile);

module.exports = router;