module.exports = {
  ensureAdmin: function (req, res, next) {
    if (req.session && req.session.role === 'admin') {
      return next();
    }
    req.flash('error', 'Access denied. Admins only.');
    res.redirect('/dashboard');
  }
};