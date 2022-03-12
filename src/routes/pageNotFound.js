const { Render404Page } = require('../controllers/Render404Page');

const express = require('express');
const router = express.Router();

router.use(Render404Page);

module.exports = router;