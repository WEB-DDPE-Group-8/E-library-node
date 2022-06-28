module.exports = {
    isLoggedin(req, res, next) {
        if (req.session.userID) {
            return next();
        }
        return res.redirect('/auth/login');
    },

    isNotLoggedin(req, res, next) {
        // console.log(req.cookie);
        if (!req.session.userID) {
            return next();
        }
        return res.redirect('/');
    }

}
