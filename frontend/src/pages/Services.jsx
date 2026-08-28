import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Loader2 } from 'lucide-react';
import api from '../services/api.js';
import SEO from '../components/common/SEO.jsx';
import Breadcrumb from '../components/common/Breadcrumb.jsx';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/services').then(res => {
      setServices(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  return (
    <>
      <SEO title="خدمات تخصصی" description="لیست کامل خدمات تشخیصی و درمانی قلب و عروق" />
      <Breadcrumb items={[{ name: 'خدمات' }]} />
      
      <section className="section-padding">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">خدمات تخصصی قلب و عروق</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ارائه جامع‌ترین خدمات تشخیصی و درمانی با استفاده از پیشرفته‌ترین تکنولوژی‌های روز دنیا
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Link key={service._id} to={`/services/${service.slug}`} className="card group flex flex-col">
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{service.shortDescription}</p>
              <span className="text-primary text-sm font-medium flex items-center gap-1">
                اطلاعات بیشتر <ChevronLeft size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;
