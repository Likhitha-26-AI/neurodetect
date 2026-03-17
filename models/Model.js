const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  framework: { type: String, enum: ['FastAI', 'YOLOv5', 'PyTorch', 'Other'] },
  epochs: { type: Number },
  accuracy: { type: String },
  precision: { type: String },
  recall: { type: String },
  f1Score: { type: String },
  trainingDate: { type: Date },
  modelFile: { type: String, default: '' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Model', ModelSchema);