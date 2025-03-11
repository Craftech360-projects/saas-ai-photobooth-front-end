import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CameraView } from "../components/camera/CameraView";
import { GenderSelector } from "../components/forms/GenderSelector";
import { UserForm } from "../components/forms/UserForm";
import { THEMES } from "../constants/themes";
import { useBackgrounds } from "../contexts/BackgroundContext";
import { useCamera } from "../hooks/useCamera";
import SceneSlider from "../SceneSlider";
import { getSettings } from "../services/settingsService";
import { getActiveThemes } from "../services/themeService";
import { ThemeSlider } from "../theme-slider";

// In your Photobooth.jsx or similar main component

function Photobooth() {
  // Add a new state to track the current step
  const [currentStep, setCurrentStep] = useState('start'); // 'start', 'gender', 'processing', etc.
  
  // Handle start button click
  const handleStartClick = () => {
    setCurrentStep('gender');
  };
  
  // Render different screens based on currentStep
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${settings.background_url})` }}
      >
        {/* Start screen */}
        {currentStep === 'start' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-6 text-center text-white">
              {settings.app_title || "AI Photobooth"}
            </h1>
            <p className="text-xl mb-8 text-center text-white">
              {settings.welcome_message || "Welcome to the AI Photobooth!"}
            </p>
            
            <button
              className="px-8 py-3 text-white rounded-md shadow-lg"
              style={{
                backgroundColor: settings.button_style?.backgroundColor || '#8b5cf6',
                width: settings.button_style?.width || '312px',
                height: settings.button_style?.height || '86px',
                borderRadius: settings.button_style?.borderRadius || '8px',
                backgroundImage: settings.start_button_background ? `url(${settings.start_button_background})` : 'none',
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              onClick={handleStartClick}
            >
              Start
            </button>
          </div>
        )}
        
        {/* Gender selection screen */}
        {currentStep === 'gender' && (
          <div className="gender-selection-container">
            {/* Your existing gender selection UI */}
          </div>
        )}
        
        {/* Other steps... */}
      </div>
    </div>
  );
}

function PhotoBooth({ previewMode = false, previewSettings = null }) {
  const navigate = useNavigate();
  // Update the initial state to be null or loading
  const [currentStep, setCurrentStep] = useState("loading");
  
  // Then in the useEffect where you fetch settings:
  useEffect(() => {
    // Update settings if they change in preview mode
    if (previewSettings) {
      setSettings(previewSettings);
      // Set the initial step based on the preview settings
      setCurrentStep(previewSettings?.enable_data_collection ? "userForm" : "start");
      setLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        // Fetch themes
        const themesData = await getActiveThemes();
        if (themesData && themesData.length > 0) {
          setThemes(themesData);
        }

        // Fetch settings
        const settingsData = await getSettings();
        console.log("Settings loaded in PhotoBooth:", settingsData);
        if (settingsData) {
          setSettings(settingsData);
          // Set the initial step based on the fetched settings
          setCurrentStep(settingsData?.enable_data_collection ? "userForm" : "start");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // If there's an error, default to start
        setCurrentStep("start");
      } finally {
        setLoading(false);
      }
    };
    
    if (!previewMode) {
      fetchData();
    }
  }, [previewMode, previewSettings]);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    gender: "",
  });
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedScene, setSelectedScene] = useState(null);
  const { videoRef, canvasRef, isCameraOn, setIsCameraOn, captureImage } = useCamera();
  const { backgrounds } = useBackgrounds(); // Get backgrounds from context
  console.log("Current backgrounds from context:", backgrounds);
  const [themes, setThemes] = useState([]);
  const [settings, setSettings] = useState(previewSettings || null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Update settings if they change in preview mode
    if (previewSettings) {
      setSettings(previewSettings);
      setLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        // Fetch themes
        const themesData = await getActiveThemes();
        if (themesData && themesData.length > 0) {
          setThemes(themesData);
        }

        // Fetch settings
        const settingsData = await getSettings();
        console.log("Settings loaded in PhotoBooth:", settingsData);
        if (settingsData) {
          setSettings(settingsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (!previewMode) {
      fetchData();
    }
  }, [previewMode, previewSettings]);

  const handleUserFormSubmit = (formData) => {
    setUserDetails({...userDetails, ...formData});
    setCurrentStep("gender");
  };

  const handleGenderSelect = (gender) => {
    setUserDetails({...userDetails, gender});
    setCurrentStep("theme");
  };

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setCurrentStep("scene");
  };

  const handleSceneSelect = (scene) => {
    setSelectedScene(scene);
    setIsCameraOn(true);
    setCurrentStep("camera");
  };

  const handleCapture = async () => {
    const imageBlob = await captureImage();
    navigate("/swap", {
      state: { 
        sourceImage: imageBlob, 
        userDetails, 
        selectedImage: selectedScene 
      },
    });
  };

  // Render the appropriate step
  // Modify the renderStep function to handle the case when user data collection is disabled
  const renderStep = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading...</p>
          </div>
        </div>
      );
    }

    // In the renderStep function of PhotoBooth.jsx
    switch(currentStep) {
      // Update the start screen rendering in the renderStep function
      // In the renderStep function, update the "start" case:
      case "start":
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 
              className={`font-${settings?.start_title_font_weight || 'bold'} text-center`}
              style={{ 
                fontSize: settings?.start_title_font_size ? `${settings.start_title_font_size}rem` : '2.5rem',
                color: settings?.start_title_color || 'black',
                marginBottom: settings?.start_title_margin_bottom ? `${settings.start_title_margin_bottom}px` : '1.5rem'
              }}
            >
              {settings?.app_title || "AI Photobooth"}
            </h1>
            <p 
              className="text-center"
              style={{ 
                fontSize: settings?.start_message_font_size ? `${settings.start_message_font_size}rem` : '1.25rem',
                color: settings?.start_message_color || 'black',
                marginBottom: settings?.start_message_margin_bottom ? `${settings.start_message_margin_bottom}px` : '2rem'
              }}
            >
              {settings?.welcome_message || "Welcome to the AI Photobooth!"}
            </p>
            
            <button
              className="px-8 py-3 text-white rounded-md shadow-lg"
              style={{
                backgroundColor: settings?.button_style?.backgroundColor || '#8b5cf6',
                width: settings?.button_style?.width || '312px',
                height: settings?.button_style?.height || '86px',
                borderRadius: settings?.button_style?.borderRadius || '8px',
                backgroundImage: settings?.start_button_background ? `url(${settings.start_button_background})` : 'none',
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              onClick={() => {
                if (settings?.enable_data_collection) {
                  setCurrentStep("userForm");
                } else {
                  setCurrentStep("gender");
                }
              }}
            >
              {settings?.start_button_text || "Start"}
            </button>
          </div>
        );
      case "userForm":
        // Check if data collection is enabled in settings
        // In the renderStep function, update the UserForm rendering
        if (settings?.enable_data_collection) {
          // Get form position styling based on settings
          const formPositionStyle = {};
          
          if (settings.form_position === "top") {
            formPositionStyle.top = "10%";
          } else if (settings.form_position === "middle") {
            formPositionStyle.top = "50%";
            formPositionStyle.transform = "translate(-50%, -50%)";
          } else if (settings.form_position === "bottom") {
            formPositionStyle.bottom = "10%";
          } else if (settings.form_position === "custom" && settings.form_position_percent) {
            formPositionStyle.top = `${settings.form_position_percent}%`;
          }
          
          return (
            <UserForm 
              onSubmit={handleUserFormSubmit} 
              initialValues={userDetails}
              requireName={settings?.require_name}
              requireEmail={settings?.enable_email_collection}
              style={formPositionStyle}
              formFields={settings?.custom_form_fields || []}
              formTitle={settings?.form_title || "Please Enter Your Details"}
              buttonText={settings?.button_text || "Continue"}
              buttonStyle={settings?.button_style || {}}
              formStyle={settings?.form_style || {}}
              buttonBackgroundUrl={settings?.continue_button_background || ""}
            />
          );
        }
        // If data collection is disabled, fall through to gender selection
        setCurrentStep("gender");
        return null;
      case "gender":
        return <GenderSelector onSelect={handleGenderSelect} />;
      case "theme":
        return <ThemeSlider themes={themes.length > 0 ? themes : THEMES} onSelect={handleThemeSelect} />;
      case "scene":
        // Use the scenes from the database if available
        let scenes = [];
        if (selectedTheme.male_scenes && selectedTheme.female_scenes) {
          scenes = userDetails.gender === 'male' 
            ? selectedTheme.male_scenes 
            : selectedTheme.female_scenes;
        } else {
          // Fallback to the old way
          const imageFolder = `${selectedTheme.name.toLowerCase().replace(" ", "")}/${userDetails.gender}`;
          scenes = [`${imageFolder}/1.png`, `${imageFolder}/2.png`, `${imageFolder}/3.png`];
        }
        return <SceneSlider scenes={scenes} onSelect={handleSceneSelect} />;
      case "camera":
        return <CameraView 
          videoRef={videoRef} 
          canvasRef={canvasRef} 
          onCapture={handleCapture} 
          userDetails={userDetails}
          selectedImage={selectedScene}
        />;
      default:
        return <div>Something went wrong</div>;
    }
  };
  // Get the appropriate background based on current step
  const getBackgroundImage = () => {
    console.log("Getting background for step:", currentStep);
    console.log("Available backgrounds:", backgrounds);
    
    if (currentStep === "userForm" && backgrounds?.userForm) {
      return backgrounds.userForm;
    }
    return backgrounds?.default || "/background.jpg";
  };
  return (
    <section
      className="text-center w-screen h-screen"
      style={{ 
        backgroundImage: `url(${getBackgroundImage()})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      {/* {settings && (
        <header className="absolute top-0 left-0 w-full p-4 text-white bg-black bg-opacity-30">
          <h1 className="text-2xl font-bold">{settings.app_title || "AI PhotoBooth"}</h1>
          {currentStep === "userForm" && (
            <p className="mt-2">{settings.welcome_message}</p>
          )}
        </header>
      )}
       */}
      <div className="relative h-full flex flex-col items-center justify-center">
        {renderStep()}
      </div>
      
      {/* Navigation buttons */}
      {!loading && currentStep !== "userForm" && (
        <button
          onClick={() => {
            if (currentStep === "camera") {
              setIsCameraOn(false);
            }
            setCurrentStep(prevStep => {
              switch(prevStep) {
                case "gender": return "userForm";
                case "theme": return "gender";
                case "scene": return "theme";
                case "camera": return "scene";
                default: return prevStep;
              }
            });
          }}
          className="absolute bottom-8 left-8 bg-white bg-opacity-80 text-gray-800 px-4 py-2 rounded-full hover:bg-opacity-100"
        >
          Back
        </button>
      )}
      
      {/* Admin link - only visible in development */}
      {process.env.NODE_ENV === "development" && (
        <a
          href="/admin"
          className="absolute bottom-8 right-8 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-70"
        >
          Admin
        </a>
      )}
    </section>
  );
}

export default PhotoBooth;