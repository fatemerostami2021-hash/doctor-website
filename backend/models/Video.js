const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  coverImage: { type: String },
  videoUrl: { type: String },
  socialLink: { type: String },
  category: { type: String },
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
