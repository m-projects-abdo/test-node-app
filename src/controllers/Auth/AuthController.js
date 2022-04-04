const User = require('../../data/model/user.model');
const bcrypt = require('bcryptjs');
const AppError = require('../../util/errors-handling/app.error');

exports.registerPage = (req, res, next) => {
  res.status(200).render('register',{
    pageTitle: 'Register page',
    pagePath: '/auth/register',
  });
}

exports.loginPage = (req, res, next) => {
  res.status(200).render('login',{
    pageTitle: 'Login page',
    pagePath: '/auth/login',
  });
}

exports.register = async (req, res, next) => {
  let {username, email, password} = req.body;

  try {
    //validate request body
    if(!username || !email || !password) throw new AppError(messageValidator(req.body));
    
    //check if user already exist.
    const user = await User.sequelize
    .query('SELECT email from users where email = ?', {
      replacements: [`${email}`]
    });
    //If user already exist
    if(user[0].length > 0) throw new AppError(messageValidator(req.body));

    //Hash password
    password = await bcrypt.hash(password, 12);
    
    //Create new user
    const user_session_data = await User.create({name: username, email, password});
    //check if create new user has an error
    if(!user_session_data) throw new AppError([{message:'Faild to create new user'}]);
    
    //create cart for this user
    await user_session_data.createCart();

    //register him/her on server session
    req.session.user = await user_session_data;
    req.session.save(err => {
      console.log(err); 

      //after complet creation redirect to home page
      res.redirect('/');
    })
  } 
  catch(err) {
    req.flash('error', err.errors);
    res.redirect(err.statusCode, '/auth/register');
  }
}

exports.login = async (req, res, next) => {
  const {email, password} = req.body;

  try {
    //validate request..
    if(!email || !password) throw new AppError(messageValidator(req.body));

    const user_session_data = await User.findOne({ where: { email: email } })
    //check user if not have an account..
    if (!user_session_data) throw new AppError([{message: 'Email or password are wrong.'}]);  
    
    //check if user have the same password was logged in..
    const passwordValidate = await bcrypt.compare(password, user_session_data.dataValues.password);
    if (!passwordValidate) throw new AppError([{message: 'Email or Password are wrong!'}]);

    //register him/her on browser session
    req.session.user = await user_session_data;
    req.session.save(err => {
      console.log(err);
      res.redirect('/');
    })
  } 
  catch(err) {
    req.flash('error', err.errors);
    res.redirect(err.statusCode, '/auth/login');
  }
}

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  })
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