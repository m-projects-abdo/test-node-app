const Users = require('../../data/migrations/users');
const bcrypt = require('bcryptjs');

exports.registerPage = (req, res, next) => {
  res.render('register',{
    pageTitle: 'Register page',
    pagePath: '/auth/register',
    isLoggedIn: req.isLoggedIn,
    username: req.isLoggedIn ? req.user.name : '',
    errors: []
  });
}

exports.loginPage = (req, res, next) => {
  res.status(200).render('login',{
    pageTitle: 'Login page',
    pagePath: '/auth/login',
    isLoggedIn: req.isLoggedIn,
    username: req.isLoggedIn ? req.user.name : '',
    errors: []
  });
}

exports.register = async (req, res, next) => {
  let {username, email, password} = req.body;

  //validate request body
  if(!username || !email || !password) {
    return res.status(404).render('register', {
      pagePath: '/auth/register',
      pageTitle: 'Register',
      isLoggedIn: req.isLoggedIn,
      username: req.isLoggedIn ? req.user.name : '',
      errors: messageValidator(req.body)
    });
  }

  //check if user already exist.
  const user = await Users.sequelize
    .query('SELECT email from users where email = ?', {
      replacements: [`${email}`]
    });
  
  if(user[0].length > 0) {
    return res.status(200).render('register', {
      pagePath: '/auth/register',
      pageTitle: 'Register',
      isLoggedIn: req.isLoggedIn,
      username: req.isLoggedIn ? req.user.name : '',
      errors: messageValidator(req.body)
    });
  } 

  //Hash password
  password = await bcrypt.hash(password, 12);

  //create new user
  const user_session_data = await Users.create({name: username, email, password});
  
  //register him/her on browser session
  req.session.user = user_session_data;

  return res.redirect('/');
}

exports.login = async (req, res, next) => {
  const {email, password} = req.body;

  //validate request..
  if(!email || !password) {
    return res.status(404).render('login', {
      pagePath: '/auth/login',
      pageTitle: 'Login',
      isLoggedIn: req.isLoggedIn,
      username: req.isLoggedIn ? req.user.name : '',
      errors: messageValidator(req.body)
    });
  }
  
  const user_session_data = await Users.findOne({ where: { email: email } })
  if (!user_session_data) {
    return res.render('login', {
      pagePath: '/auth/login',
      pageTitle: 'Login',
      isLoggedIn: req.isLoggedIn,
      username: req.isLoggedIn ? req.user.name : '',
      errors: [{message: 'Email or password are wrong.'}]
    });
  }

  const passwordValidate = await bcrypt.compare(password, user_session_data.dataValues.password);
  if (!passwordValidate) {
    return res.status(200).render('login', {
      pagePath: '/auth/login',
      pageTitle: 'Login',
      isLoggedIn: req.isLoggedIn,
      username: req.isLoggedIn ? req.user.name : '',
      errors: [{message: 'Email or Password are wrong!'}]
    });
  }

  //register him/her on browser session
  req.session.user = user_session_data;

  return res.redirect('/');
}

exports.logout = (req, res, next) => {
  if(req.isLoggedIn) {
    req.session.destroy();
    return res.redirect('/');
  }

  return res.status(404).redirect('/');
}

const messageValidator = (payload) => {  
  const errors = [];
  if (!payload.username && payload.username != undefined) {
    errors.push({ message: 'Username is required.' });
  } 

  if (!payload.email) {
    errors.push({ message: 'Email is required.' });
  }

  if (!payload.password) {
    errors.push({ message: 'Password is required.' });
  }

  if (payload.email) {
    errors.push({ message: 'This user already exist.' });
  }
  
  return errors;
}