import { createContext, useContext, useEffect, useState } from 'react';
import { getSettings } from '../services/settingsService';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // First check if we have settings in sessionStorage
        const cachedSettings = sessionStorage.getItem('appSettings');
        if (cachedSettings) {
          setSettings(JSON.parse(cachedSettings));
          setLoading(false);
          return;
        }

        // If not, fetch from API
        const data = await getSettings();
        if (data) {
          setSettings(data);
          // Cache in sessionStorage
          sessionStorage.setItem('appSettings', JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();

    // Listen for storage events to sync settings across tabs
    const handleStorageChange = (e) => {
      if (e.key === 'appSettings' && e.newValue) {
        setSettings(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}