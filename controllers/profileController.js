const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.index = async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render('profile/index', { user, session: req.session, messages: req.flash() });
};

exports.update = async (req, res) => {
  const { name, email } = req.body;
  const update = { name, email };
  if (req.file) update.profilePicture = req.file.filename;
  await User.findByIdAndUpdate(req.session.userId, update);
  req.session.userName = name;
  req.flash('success', 'Profile updated');
  res.redirect('/profile');
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.session.userId);
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    req.flash('error', 'Current password is incorrect');
    return res.redirect('/profile');
  }
  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(req.session.userId, { password: hashed });
  req.flash('success', 'Password changed');
  res.redirect('/profile');
};