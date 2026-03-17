const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
  res.render('auth/login', { messages: req.flash() });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/auth/login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/auth/login');
    }
    req.session.userId = user._id;
    req.session.userName = user.name;
    req.session.role = user.role;
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.redirect('/auth/login');
  }
};

exports.getRegister = (req, res) => {
  res.render('auth/register', { messages: req.flash() });
};

exports.postRegister = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      req.flash('error', 'Email already registered');
      return res.redirect('/auth/register');
    }
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed, role: role || 'researcher' });
    req.flash('success', 'Registered successfully. Please login.');
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.redirect('/auth/register');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
};