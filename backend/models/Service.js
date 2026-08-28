const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  metaTitle: { type: String },
  metaDescription: { type: String, maxlength: 160 },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },
  icon: { type: String },
  image: { type: String },
  order: { type: Number, default: 0 },
  faq: [{ question: String, answer: String }],
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
