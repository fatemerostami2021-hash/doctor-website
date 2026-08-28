import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import SEO from '../../components/common/SEO.jsx';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
    setLoading(false);
  };

  return (
    <>
      <SEO title="ورود به پنل مدیریت" />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md">
          <div className="card">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <LogIn size={28} />
              </div>
              <h1 className="text-2xl font-bold">ورود به پنل مدیریت</h1>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">نام کاربری</label>
                <input required value={username} onChange={e => setUsername(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">رمز عبور</label>
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full flex justify-center items-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={18} /> : 'ورود'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
