const {
  login, 
  logout,
  register,
  loginPage, 
  registerPage 
} = require('../../controllers/Auth/UsersController');

const express = require('express');
const router = express.Router();

router.get('/register', registerPage);
router.get('/login', loginPage);

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;