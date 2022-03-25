const { page, details } = require('../controllers/ProfileController');
const { isAuthorize } = require('../util/middleware/auth.middleware');

const express = require('express');
const router = express.Router();

router.get('/', isAuthorize, page);
router.get('/details', isAuthorize, details);

module.exports = router;