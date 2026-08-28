import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Stethoscope, Video, Calendar, LogOut, Users, Eye } from 'lucide-react';
import api from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import SEO from '../../components/common/SEO.jsx';

const Dashboard = () => {
  const [stats, setStats] = useState({ articles: 0, services: 0, videos: 0, appointments: 0 });
  const [appointments, setAppointments] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    Promise.all([
      api.get('/articles?limit=1'),
      api.get('/services'),
      api.get('/videos'),
      api.get('/appointments')
    ]).then(([articles, services, videos, appointments]) => {
      setStats({
        articles: articles.data.totalPages * 10 || 0,
        services: services.data.length,
        videos: videos.data.length,
        appointments: appointments.data.length
      });
      setAppointments(appointments.data.slice(0, 5));
    });
  }, []);

  const statCards = [
    { icon: FileText, label: 'مقالات', value: stats.articles, color: 'bg-blue-50 text-blue-600' },
    { icon: Stethoscope, label: 'خدمات', value: stats.services, color: 'bg-green-50 text-green-600' },
    { icon: Video, label: 'ویدئوها', value: stats.videos, color: 'bg-purple-50 text-purple-600' },
    { icon: Calendar, label: 'نوبت‌ها', value: stats.appointments, color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <>
      <SEO title="پنل مدیریت" />
      <div className="min-h-screen bg-gray-100">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold">پنل مدیریت</h1>
            <button onClick={logout} className="flex items-center gap-2 text-red-600 hover:text-red-700">
              <LogOut size={18} /> خروج
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat) => (
              <div key={stat.label} className="card flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 card">
              <h2 className="text-xl font-bold mb-6">آخرین نوبت‌ها</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-3 px-4">نام</th>
                      <th className="text-right py-3 px-4">تلفن</th>
                      <th className="text-right py-3 px-4">تاریخ</th>
                      <th className="text-right py-3 px-4">وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt) => (
                      <tr key={apt._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{apt.fullName}</td>
                        <td className="py-3 px-4">{apt.phone}</td>
                        <td className="py-3 px-4">{apt.preferredDate ? new Date(apt.preferredDate).toLocaleDateString('fa-IR') : '-'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            apt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {apt.status === 'pending' ? 'در انتظار' : apt.status === 'confirmed' ? 'تایید شده' : 'لغو شده'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card space-y-4">
              <h2 className="text-xl font-bold mb-4">دسترسی سریع</h2>
              <Link to="/articles" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="text-primary" size={20} />
                <span>مدیریت مقالات</span>
              </Link>
              <Link to="/services" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Stethoscope className="text-primary" size={20} />
                <span>مدیریت خدمات</span>
              </Link>
              <Link to="/videos" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Video className="text-primary" size={20} />
                <span>مدیریت ویدئوها</span>
              </Link>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">توجه: برای افزودن محتوای جدید از API یا Postman استفاده کنید.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
