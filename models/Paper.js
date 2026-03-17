const mongoose = require('mongoose');

const PaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: String, required: true },
  abstract: { type: String, required: true },
  year: { type: Number, required: true },
  category: { type: String },
  datasetUsed: { type: String },
  modelUsed: { type: String, enum: ['CNN', 'YOLOv5', 'Other'] },
  accuracy: { type: String },
  pdfFile: { type: String, default: '' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Paper', PaperSchema);