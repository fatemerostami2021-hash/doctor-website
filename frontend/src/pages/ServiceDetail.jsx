import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import api from '../services/api.js';
import SEO from '../components/common/SEO.jsx';
import SchemaMarkup from '../components/common/SchemaMarkup.jsx';
import Breadcrumb from '../components/common/Breadcrumb.jsx';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/services/${slug}`).then(res => {
      setService(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>;
  if (!service) return <div className="text-center py-20 text-gray-500">خدمت مورد نظر یافت نشد</div>;

  return (
    <>
      <SEO title={service.metaTitle || service.title} description={service.metaDescription || service.shortDescription} />
      <SchemaMarkup type="physician" data={{ name: service.title, description: service.shortDescription }} />
      <Breadcrumb items={[
        { name: 'خدمات', url: '/services' },
        { name: service.title }
      ]} />

      <article className="section-padding max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{service.title}</h1>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: service.content }} />
        
        {service.faq?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">سوالات متداول</h2>
            <div className="space-y-4">
              {service.faq.map((item, index) => (
                <div key={index} className="card">
                  <h3 className="font-bold text-lg mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
};

export default ServiceDetail;
