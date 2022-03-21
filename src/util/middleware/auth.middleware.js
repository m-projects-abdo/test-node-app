const Users = require('../../data/migrations/users');

//protect all page need to login..
exports.isNotAuthorize = (req, res, next) => {
  return !!req.user ? next() : res.redirect('/auth/login');
}

//protect login and register page..
exports.isAuthorize = (req, res, next) => {
  return !!req.user ? res.redirect('/') : next();
}

//check user session..
exports.initUser = async (req, res, next) => {
  try {
    if(!req.session.user) throw new Error('User not authorize.')
    
    const user = await Users
      .findOne({where:{id: req.session.user.id}});

    if(!user) throw new Error('User not authorize.');
    
    req.user = user;
    next();
  } 
  catch(err) { next() }
}