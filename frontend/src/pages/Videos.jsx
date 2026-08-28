import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Loader2 } from 'lucide-react';
import api from '../services/api.js';
import SEO from '../components/common/SEO.jsx';
import Breadcrumb from '../components/common/Breadcrumb.jsx';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/videos').then(res => {
      setVideos(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  return (
    <>
      <SEO title="ویدئوهای آموزشی" description="ویدئوهای آموزشی درباره بیماری‌های قلبی و روش‌های درمان" />
      <Breadcrumb items={[{ name: 'ویدئوها' }]} />

      <section className="section-padding">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">ویدئوهای آموزشی</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ویدئوهای توضیحی و آموزشی درباره بیماری‌های قلبی، روش‌های تشخیصی و درمانی
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video._id} className="card group">
              <div className="relative h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                {video.coverImage ? (
                  <img src={video.coverImage} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <Play className="text-white" size={48} />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="text-white" size={48} />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">{video.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Videos;
