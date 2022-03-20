exports.Render404Page = (req, res, next) => {
    res.status(404).render('404', { 
        pageTitle: 'Page Not Found',
        pagePath: '/',
        isLoggedIn: req.isLoggedIn,
        username: req.user.name || '' 
    });
}