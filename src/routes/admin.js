const { getProducts, getProfile, getCurrentUser } = require('../controllers/AdminController');
const { isAuthorize, isNotAuthorize } = require('../util/middleware/auth.middleware');

const express = require('express');
const router = express.Router();

router.get('/', getProducts);
router.get('/user', getCurrentUser);
router.get('/profile', isNotAuthorize, getProfile);

module.exports = router;