const Paper = require('../models/Paper');

exports.index = async (req, res) => {
  const papers = await Paper.find().sort({ createdAt: -1 });
  res.render('papers/index', { papers, session: req.session, messages: req.flash() });
};

exports.create = (req, res) => {
  res.render('papers/create', { session: req.session, messages: req.flash() });
};

exports.store = async (req, res) => {
  const { title, authors, abstract, year, category, datasetUsed, modelUsed, accuracy } = req.body;
  const pdfFile = req.file ? req.file.filename : '';
  await Paper.create({
    title, authors, abstract, year, category,
    datasetUsed, modelUsed, accuracy, pdfFile,
    uploadedBy: req.session.userId
  });
  req.flash('success', 'Paper uploaded successfully');
  res.redirect('/papers');
};

exports.show = async (req, res) => {
  const paper = await Paper.findById(req.params.id);
  res.render('papers/show', { paper, session: req.session });
};

exports.edit = async (req, res) => {
  const paper = await Paper.findById(req.params.id);
  res.render('papers/edit', { paper, session: req.session, messages: req.flash() });
};

exports.update = async (req, res) => {
  const { title, authors, abstract, year, category, datasetUsed, modelUsed, accuracy } = req.body;
  const update = { title, authors, abstract, year, category, datasetUsed, modelUsed, accuracy };
  if (req.file) update.pdfFile = req.file.filename;
  await Paper.findByIdAndUpdate(req.params.id, update);
  req.flash('success', 'Paper updated');
  res.redirect('/papers');
};

exports.destroy = async (req, res) => {
  await Paper.findByIdAndDelete(req.params.id);
  req.flash('success', 'Paper deleted');
  res.redirect('/papers');
};