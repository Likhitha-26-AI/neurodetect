module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.session && req.session.userId) {
      return next();
    }
    req.flash('error', 'Please log in to continue');
    res.redirect('/auth/login');
  }
};