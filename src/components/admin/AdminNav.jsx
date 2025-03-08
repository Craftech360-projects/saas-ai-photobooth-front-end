import { Link, useLocation } from 'react-router-dom';

export function AdminNav() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-violet-700' : '';
  };
  
  return (
    <nav className="bg-violet-800 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-bold mb-4 md:mb-0">
          PhotoBooth Admin
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Link 
            to="/admin" 
            className={`px-4 py-2 rounded hover:bg-violet-700 ${isActive('/admin')}`}
          >
            Backgrounds
          </Link>
          <Link 
            to="/admin/themes" 
            className={`px-4 py-2 rounded hover:bg-violet-700 ${isActive('/admin/themes')}`}
          >
            Themes
          </Link>
          <Link 
            to="/admin/settings" 
            className={`px-4 py-2 rounded hover:bg-violet-700 ${isActive('/admin/settings')}`}
          >
            Settings
          </Link>
          <Link 
            to="/" 
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700"
          >
            View PhotoBooth
          </Link>
        </div>
      </div>
    </nav>
  );
}