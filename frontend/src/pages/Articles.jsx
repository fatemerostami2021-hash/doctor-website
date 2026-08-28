import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Loader2, ChevronLeft } from 'lucide-react';
import api from '../services/api.js';
import SEO from '../components/common/SEO.jsx';
import Breadcrumb from '../components/common/Breadcrumb.jsx';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/articles').then(res => {
      setArticles(res.data.articles);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  return (
    <>
      <SEO title="مقالات آموزشی" description="جدیدترین مقالات تخصصی در حوزه قلب و عروق" />
      <Breadcrumb items={[{ name: 'مقالات' }]} />

      <section className="section-padding">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">مقالات آموزشی</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            جدیدترین اطلاعات علمی و پزشکی درباره بیماری‌های قلبی و عروقی و روش‌های پیشگیری و درمان
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article._id} to={`/articles/${article.slug}`} className="card group flex flex-col h-full">
              {article.featuredImage && (
                <div className="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(article.createdAt).toLocaleDateString('fa-IR')}</span>
                <span className="flex items-center gap-1"><User size={14} /> {article.author}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{article.excerpt || article.content.substring(0, 150)}...</p>
              <span className="text-primary text-sm font-medium flex items-center gap-1">
                ادامه مطلب <ChevronLeft size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Articles;
