const {
  login, 
  logout,
  register,
  loginPage, 
  registerPage 
} = require('../../controllers/Auth/UsersController');

const { isNotAuthorize } = require('../../util/middleware/auth.middleware');

const express = require('express');
const router = express.Router();

router.get('/register', isNotAuthorize, registerPage);
router.get('/login', isNotAuthorize, loginPage);

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;