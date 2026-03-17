const Dataset = require('../models/Dataset');

exports.index = async (req, res) => {
  const datasets = await Dataset.find().sort({ createdAt: -1 });
  res.render('datasets/index', { datasets, session: req.session, messages: req.flash() });
};

exports.store = async (req, res) => {
  const { name, type, numImages, mriType, description } = req.body;
  const datasetFile = req.file ? req.file.filename : '';
  await Dataset.create({ name, type, numImages, mriType, description, datasetFile, uploadedBy: req.session.userId });
  req.flash('success', 'Dataset added');
  res.redirect('/datasets');
};

exports.destroy = async (req, res) => {
  await Dataset.findByIdAndDelete(req.params.id);
  req.flash('success', 'Dataset deleted');
  res.redirect('/datasets');
};