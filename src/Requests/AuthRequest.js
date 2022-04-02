const AppError = require('../util/errors-handling/app.error');

exports.requestValidate = (req, res, next) => {
  const {username, email, password} = req.body;

  try {
    //validate request body
    if(!username || !email || !password)
      throw new AppError(messageValidator(req.body));

    next();
  }
  catch (err) {
    console.log(err.errors);
  }
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
