const { page, add } = require('../controllers/OrderController');
const { isAuthorize } = require('../util/middleware/auth.middleware');

const express = require('express');
const router = express.Router();

router.get('/', isAuthorize, page);
router.post('/', isAuthorize, add);

module.exports = router;