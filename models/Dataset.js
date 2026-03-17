const mongoose = require('mongoose');

const DatasetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  numImages: { type: Number, required: true },
  mriType: { type: String },
  description: { type: String },
  datasetFile: { type: String, default: '' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dataset', DatasetSchema);