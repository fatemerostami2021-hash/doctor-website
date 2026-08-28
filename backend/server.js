require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const generateSitemap = require('./utils/sitemapGenerator');
const Article = require('./models/Article');
const Service = require('./models/Service');
const Video = require('./models/Video');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json({ limit: '10mb' }));

connectDB();

app.use('/api/articles', require('./routes/articles'));
app.use('/api/services', require('./routes/services'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/videos', require('./routes/videos'));
app.use('/api/auth', require('./routes/auth'));

app.get('/api/health', (req, res) => res.json({ status: 'OK', time: new Date().toISOString() }));

app.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = process.env.FRONTEND_URL || 'https://your-domain.vercel.app';
    const [articles, services, videos] = await Promise.all([
      Article.find({ published: true }),
      Service.find({ published: true }),
      Video.find({ published: true })
    ]);
    const xml = generateSitemap(baseUrl, articles, services, videos);
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) { res.status(500).send('Error generating sitemap'); }
});

app.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.FRONTEND_URL || 'https://your-domain.vercel.app';
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`);
});

app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log('Server running on port ' + PORT));
}

module.exports = app;
