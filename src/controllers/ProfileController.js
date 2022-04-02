const User = require('../data/model/user.model');

exports.page = async (req, res, next) => {
  try {
    const userProduct = await req.user.getProducts();        
    return res.status(200).render('profile', {
      pageTitle: req.user.name,
      pagePath: '/profile',
      isLoggedIn: !!req.user,
      profile: req.user,
      products: userProduct,
      username: req.user.name,
    });
  } 
  catch (error) {
    console.log(error.message);
  }
}

exports.pageById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const hisProduct = await user.getProducts({include: ['user']});
    
    return res.status(200).render('profile', {
      pageTitle: user.dataValues.name,
      pagePath: '',
      isLoggedIn: !!req.user,
      profile: user,
      products: hisProduct,
      username: req.user.name,
      userId: !!req.user ? req.user.id : 0 
    });
  }
  catch (err) {
    console.log(err.message);
  }
}

exports.details = async (req, res, next) => {
  try {
    if(!req.user) throw new Error();
      
    return res.status(200).json({
      message: `Welcome ${req.user.name} to your community.`,
      data: {
        ...req.user.dataValues
      }
    });
  } catch (error) {
    res.status(300).redirect('/');
  }
}