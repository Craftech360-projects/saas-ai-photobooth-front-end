import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { AdminAuth } from './components/auth/AdminAuth';
import { BackgroundProvider } from './contexts/BackgroundContext';
import Error from './Error';
import LoadingPage from './LoadingPage';
import Admin from './pages/Admin';
import PhotoBooth from './pages/PhotoBooth';
import SettingsAdmin from './pages/SettingsAdmin';
import ThemeAdmin from './pages/ThemeAdmin';
import Result from './Result';
import Swap from './Swap';

function App() {
  return (
    <BackgroundProvider>
      <Router>
        <Routes>
          {/* Admin routes */}
          <Route path="/admin/*" element={
            <AdminAuth>
              <Routes>
                <Route path="/" element={<Admin />} />
                <Route path="/themes" element={<ThemeAdmin />} />
                <Route path="/settings" element={<SettingsAdmin />} />
              </Routes>
            </AdminAuth>
          } />
          
          {/* Public routes */}
          <Route path="/" element={<PhotoBooth />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/result" element={<Result />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
    </BackgroundProvider>
  );
}

export default App;
