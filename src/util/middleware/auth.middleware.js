//protect all page need to login..
exports.isAuthorize = (req, res, next) => {
  return req.isLoggedIn ? next() : res.redirect('/auth/login');
}

//protect login and register page..
exports.isNotAuthorize = (req, res, next) => {
  return req.isLoggedIn ? res.redirect('/') : next();
}