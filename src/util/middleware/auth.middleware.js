const Users = require('../../data/model/user.model');

//protect all page need to login..
exports.isAuthorize = (req, res, next) => {
  return !!req.user ? next() : res.redirect('/auth/login');
}

//protect login and register page..
exports.isNotAuthorize = (req, res, next) => {
  return !!req.user ? res.redirect('/') : next();
}

//check user session..
exports.initUser = async (req, res, next) => {
  try {
    if(!req.session.user) throw new Error('User not authorize.')
    
    const user = await Users
      .findByPk(req.session.user.id);

    if(!user) throw new Error('User not authorize.');

    req.user = user;
    next();
  } 
  catch(err) { 
    console.log(err.message);
    next() 
  }
}