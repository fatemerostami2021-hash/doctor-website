const Article = require('../models/Article');

exports.getArticles = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = { published: true };
    if (category) query.category = category;
    
    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
      
    const count = await Article.countDocuments(query);
    
    res.json({ articles, totalPages: Math.ceil(count / limit), currentPage: Number(page) });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug, published: true });
    if (!article) return res.status(404).json({ message: 'Article not found' });
    article.views += 1; await article.save();
    res.json(article);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.createArticle = async (req, res) => {
  try { const article = await Article.create(req.body); res.status(201).json(article); }
  catch (error) { res.status(400).json({ message: error.message }); }
};

exports.updateArticle = async (req, res) => {
  try { const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(article); }
  catch (error) { res.status(400).json({ message: error.message }); }
};

exports.deleteArticle = async (req, res) => {
  try { await Article.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (error) { res.status(500).json({ message: error.message }); }
};
