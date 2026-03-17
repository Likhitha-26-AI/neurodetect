const AIModel = require('../models/Model');

exports.index = async (req, res) => {
  const models = await AIModel.find().sort({ createdAt: -1 });
  res.render('models/index', { models, session: req.session, messages: req.flash() });
};

exports.store = async (req, res) => {
  const { name, framework, epochs, accuracy, precision, recall, f1Score, trainingDate } = req.body;
  const modelFile = req.file ? req.file.filename : '';
  await AIModel.create({ name, framework, epochs, accuracy, precision, recall, f1Score, trainingDate, modelFile, uploadedBy: req.session.userId });
  req.flash('success', 'Model added');
  res.redirect('/models');
};

exports.destroy = async (req, res) => {
  await AIModel.findByIdAndDelete(req.params.id);
  req.flash('success', 'Model deleted');
  res.redirect('/models');
};