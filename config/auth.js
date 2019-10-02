module.exports = {
    authenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.json({ type: 'Warning', message: 'You must signin first' });
        res.redirect('/users/login');
    }
};