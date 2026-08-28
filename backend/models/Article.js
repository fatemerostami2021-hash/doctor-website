const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  metaTitle: { type: String },
  metaDescription: { type: String, maxlength: 160 },
  content: { type: String, required: true },
  excerpt: { type: String, maxlength: 300 },
  featuredImage: { type: String },
  category: { type: String, required: true, index: true },
  author: { type: String, default: 'دکتر فوق تخصص قلب و عروق' },
  tags: [{ type: String }],
  faq: [{ question: String, answer: String }],
  relatedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  published: { type: Boolean, default: false, index: true },
  views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
