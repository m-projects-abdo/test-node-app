const Users = require('../../data/migrations/users');
const bcrypt = require('bcryptjs');

let errors = {errors:{}};

exports.registerPage = (req, res, next) => {
  res.status(200).render('register',{
    pageTitle: 'Register page',
    pagePath: '/auth/register'
  });
}

exports.loginPage = (req, res, next) => {
  res.status(200).render('login',{
    pageTitle: 'Login page',
    pagePath: '/auth/login'
  });
}

exports.register = async (req, res, next) => {
  let {username, email, password} = req.body;

  //validate request body
  if(!username || !email || !password) {
    messageValidator(req.body);
    return res.status(404).json(errors);
  } 

  //check if user already exist.
  const user = await Users.sequelize
    .query('SELECT email from users where email = ?', {
      replacements: [`${email}`]
    });
  
  if(user[0].length > 0) {
    return res.status(200).json({
      message: 'This user already exist.'
    })
  } 

  //Hash password
  password = await bcrypt.hash(password, 12);

  //create new user
  Users.create({name: username, email, password});
  
  return res.status(200).redirect('/');

  // return res.status(201).json({
  //   message: `User with name ${username}, created successfully.`
  // });
}

exports.login = async (req, res, next) => {
  const {email, password} = req.body;

  //validate request..
  if(!email || !password) {
    messageValidator(req.body);
    return res.status(404).json(errors);
  }

  const user = await Users.findOne({where:{email: email}})
  
  if(!user) {
    return res.status(404).json({
      message: 'User not found.'
    });
  }

  const passwordValidate = await bcrypt.compare(password, user.dataValues.password);

  if (!passwordValidate) {
    return res.status(200).json({
      message: 'Email or password are invalid.'
    });
  }

  return res.status(200).json({
    message: `Welcome ${user.dataValues.name} to your community.`,
    data: {
      ...user.dataValues,
      password: password
    }
  });
}

const messageValidator = (payload) => {  
  if (!payload.username && payload.username != undefined) errors.errors.username = {
    message: 'Username is required.'
  }

  if (!payload.email && payload.email != undefined) errors.errors.email = {
    message: 'Email is required.'
  }

  if (!payload.password && payload.password != undefined) errors.errors.password = {
    message: 'Password is required.'
  }
}