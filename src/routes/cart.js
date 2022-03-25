const { page, create } = require('../controllers/CartController');
const { isAuthorize } = require('../util/middleware/auth.middleware');

const express = require('express');
const router = express.Router();

router.get('/', isAuthorize, page);
router.post('/:id', isAuthorize, create);

module.exports = router;