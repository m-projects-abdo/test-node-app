const { page } = require('../controllers/HomeController');

const express = require('express');
const router = express.Router();

router.get('/', page);

module.exports = router;