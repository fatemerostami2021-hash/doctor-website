const generateSitemap = (baseUrl, articles, services, videos) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const staticPages = [
    { url: '', priority: '1.0' },
    { url: 'about', priority: '0.8' },
    { url: 'services', priority: '0.9' },
    { url: 'articles', priority: '0.9' },
    { url: 'videos', priority: '0.8' },
    { url: 'contact', priority: '0.8' },
    { url: 'appointment', priority: '0.9' }
  ];

  staticPages.forEach(page => {
    xml += `
  <url>
    <loc>${baseUrl}/${page.url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  services.forEach(s => {
    xml += `
  <url>
    <loc>${baseUrl}/services/${s.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  articles.forEach(a => {
    xml += `
  <url>
    <loc>${baseUrl}/articles/${a.slug}</loc>
    <lastmod>${a.updatedAt ? a.updatedAt.toISOString() : new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  videos.forEach(v => {
    xml += `
  <url>
    <loc>${baseUrl}/videos/${v.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  xml += '\n</urlset>';
  return xml;
};

module.exports = generateSitemap;
