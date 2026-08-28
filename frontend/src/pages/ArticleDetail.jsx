import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, User, Eye, Loader2 } from 'lucide-react';
import api from '../services/api.js';
import SEO from '../components/common/SEO.jsx';
import SchemaMarkup from '../components/common/SchemaMarkup.jsx';
import Breadcrumb from '../components/common/Breadcrumb.jsx';

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/articles/${slug}`).then(res => {
      setArticle(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>;
  if (!article) return <div className="text-center py-20 text-gray-500">مقاله مورد نظر یافت نشد</div>;

  return (
    <>
      <SEO title={article.metaTitle || article.title} description={article.metaDescription || article.excerpt} />
      <SchemaMarkup type="article" data={{
        title: article.title,
        description: article.excerpt,
        datePublished: article.createdAt,
        dateModified: article.updatedAt,
        author: article.author,
        image: article.featuredImage
      }} />
      <Breadcrumb items={[
        { name: 'مقالات', url: '/articles' },
        { name: article.title }
      ]} />

      <article className="section-padding max-w-4xl mx-auto">
        {article.featuredImage && (
          <img src={article.featuredImage} alt={article.title} className="w-full h-64 md:h-96 object-cover rounded-xl mb-8" />
        )}
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span className="flex items-center gap-1"><Calendar size={16} /> {new Date(article.createdAt).toLocaleDateString('fa-IR')}</span>
          <span className="flex items-center gap-1"><User size={16} /> {article.author}</span>
          <span className="flex items-center gap-1"><Eye size={16} /> {article.views} بازدید</span>
        </div>

        <h1 className="text-3xl font-bold mb-6">{article.title}</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }} />

        {article.faq?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">سوالات متداول</h2>
            <div className="space-y-4">
              {article.faq.map((item, index) => (
                <div key={index} className="card">
                  <h3 className="font-bold text-lg mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
            <SchemaMarkup type="faq" data={{ questions: article.faq }} />
          </div>
        )}
      </article>
    </>
  );
};

export default ArticleDetail;
