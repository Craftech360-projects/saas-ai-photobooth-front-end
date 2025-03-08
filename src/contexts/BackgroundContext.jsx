import { createContext, useContext, useEffect, useState } from "react";
import { getActiveBackgrounds } from "../services/backgroundService";

// Create the context
const BackgroundContext = createContext();

// Create a provider component
export function BackgroundProvider({ children }) {
  const [backgrounds, setBackgrounds] = useState({
    default: "/background.jpg",
    userForm: "/background2.jpg"
  });
  const [loading, setLoading] = useState(true);
  const fetchBackgrounds = async () => {
    try {
      const backgroundsData = await getActiveBackgrounds();
      console.log("Fetched backgrounds data:", backgroundsData);
      
      if (backgroundsData && backgroundsData.length > 0) {
        // Create a map of name to URL
        const backgroundsMap = {};
        backgroundsData.forEach(bg => {
          backgroundsMap[bg.name] = bg.url;
        });
        
        console.log("Processed backgrounds map:", backgroundsMap);
        
        // Update the backgrounds state
        setBackgrounds(prev => ({
          default: backgroundsMap.default || prev.default,
          userForm: backgroundsMap.userForm || prev.userForm
        }));
      }
    } catch (error) {
      console.error("Error fetching backgrounds:", error);
    } finally {
      setLoading(false);
    }
  };
  // Fetch backgrounds on mount
  useEffect(() => {
    fetchBackgrounds();
  }, []);
  return (
    <BackgroundContext.Provider value={{ 
      backgrounds, 
      loading, 
      refreshBackgrounds: fetchBackgrounds 
    }}>
      {children}
    </BackgroundContext.Provider>
  );
}

// Create a custom hook to use the context
export function useBackgrounds() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error("useBackgrounds must be used within a BackgroundProvider");
  }
  return context;
}