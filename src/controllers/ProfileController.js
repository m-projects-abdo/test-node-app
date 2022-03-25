exports.page = async (req, res, next) => {
  try {
    const userProduct = await req.user.getProducts();        
    return res.status(200).render('profile', {
      pageTitle: req.user.name,
      pagePath: '/profile',
      isLoggedIn: !!req.user,
      data: req.user,
      products: userProduct,
      username: req.user.name
    });
  } 
  catch (error) {
    console.log(error);
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