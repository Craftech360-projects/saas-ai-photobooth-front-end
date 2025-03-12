import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { AdminAuth } from './components/auth/AdminAuth';
import { BackgroundProvider } from './contexts/BackgroundContext';
import { SettingsProvider } from './contexts/SettingsContext';
import Error from './Error';
import LoadingPage from './LoadingPage';
import Admin from './pages/Admin';
import PhotoBooth from './pages/PhotoBooth';
import SettingsAdmin from './pages/SettingsAdmin';
import ThemeAdmin from './pages/ThemeAdmin';
import Result from './Result';
import Swap from './Swap';
import { ThemeSlider } from './theme-slider';
import redcarpet from "/redcarpet.png";
import Scifi from "/scifi.png";
import outerspace from "/space.png";
import sports from "/sports.png";
import superheros from "/superheros.png";

const themes = [
  { id: 1, name: "Red Carpet", image: redcarpet },
  { id: 2, name: "Space", image: outerspace },
  { id: 3, name: "Sci-fi", image: Scifi },
  { id: 4, name: "Sports", image: sports },
  { id: 5, name: "Superheros", image: superheros },
];
const handleThemeSelect = (theme) => {
  // Handle the selected theme
  console.log('Selected theme:', theme);
};

function App() {
  return (
    <BackgroundProvider>
       <SettingsProvider>
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
          <Route path="/theme" element={<ThemeSlider themes={themes} onSelect={handleThemeSelect} />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/result" element={<Result />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
      </SettingsProvider>
    </BackgroundProvider>
  );
}

export default App;
