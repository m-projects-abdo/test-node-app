const Users = require('../../data/migrations/users');
const bcrypt = require('bcryptjs');

exports.registerPage = (req, res, next) => {
  res.status(200).render('register',{
    pageTitle: 'Register page',
    pagePath: '/auth/register',
    errors: []
  });
}

exports.loginPage = (req, res, next) => {
  res.status(200).render('login',{
    pageTitle: 'Login page',
    pagePath: '/auth/login',
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
      errors: messageValidator(req.body)
    });
  } 

  //Hash password
  password = await bcrypt.hash(password, 12);

  //create new user
  const user_session_data = await Users.create({name: username, email, password});
  
  console.log('Register: ', user_session_data);

  //register him/her on browser session
  req.session.user = user_session_data;

  return res.status(200).redirect('/');
}

exports.login = async (req, res, next) => {
  const {email, password} = req.body;

  //validate request..
  if(!email || !password) {
    return res.status(404).render('login', {
      pagePath: '/auth/login',
      pageTitle: 'Login',
      errors: messageValidator(req.body)
    });
  }
  
  const user_session_data = await Users.findOne({ where: { email: email } })
  if (!user_session_data) {
    return res.status(200).render('login', {
      pagePath: '/auth/login',
      pageTitle: 'Login',
      errors: [{message: 'You don\'t have an account.'}]
    });
  }

  const passwordValidate = await bcrypt.compare(password, user_session_data.dataValues.password);
  if (!passwordValidate) {
    return res.status(200).render('login', {
      pagePath: '/auth/login',
      pageTitle: 'Login',
      errors: [{message: 'Email or Password are wrong!'}]
    });
  }

  console.log('Login: ', user_session_data);

  //register him/her on browser session
  req.session.user = user_session_data;

  return res.status(200).redirect('/');
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