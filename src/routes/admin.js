const { getProducts, getProfile, getCurrentUser } = require('../controllers/AdminController');
const { isAuthorize } = require('../util/middleware/auth.middleware');

const express = require('express');
const router = express.Router();

router.get('/', getProducts);
router.get('/user', getCurrentUser);
router.get('/profile', isAuthorize, getProfile);

module.exports = router;