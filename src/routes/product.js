const { page, drop, create, details } = require('../controllers/ProductController');
const { isAuthorize } = require('../util/middleware/auth.middleware');

const express = require('express');
const router = express.Router();

router.get('/', isAuthorize, page);
router.get('/:id', isAuthorize, details);
router.post('/', isAuthorize, create);
router.delete('/', isAuthorize, drop);

module.exports = router;