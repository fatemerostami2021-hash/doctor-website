import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex justify-center items-center h-screen">در حال بارگذاری...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;

  return children;
};

export default PrivateRoute;
