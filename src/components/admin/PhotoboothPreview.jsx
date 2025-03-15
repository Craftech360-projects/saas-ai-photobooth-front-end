
import { useEffect, useRef, useState } from 'react';
import SceneSlider from '../../SceneSlider';
import { supabase } from '../../supabaseClient';
import { ThemeSlider } from '../../theme-slider';
import { UserForm } from '../forms/UserForm';

import { CameraView } from '../camera/CameraView';
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
export function PhotoboothPreview({ settings }) {
  const [resolution, setResolution] = useState('desktop');
  const [currentStep, setCurrentStep] = useState('welcome');
  const [genderButtonSettings, setGenderButtonSettings] = useState({});
  const [themePageSettings, setThemePageSettings] = useState({});
  const [scenePageSettings, setScenePageSettings] = useState({});
  const [cameraPageSettings, setCameraPageSettings] = useState({});
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [userDetails] = useState({}); // 
  const [selectedScene, setSelectedScene] = useState(null);
  const handleCapture = () => {
    console.log("Mock photo capture in preview");
  };
  // Add camera settings fetch and update effects
  useEffect(() => {
    const fetchCameraPageSettings = async () => {
      const { data } = await supabase
      .from('camera_page_settings')
      .select('*')
      .single();
      if (data) {
        setCameraPageSettings(data);
      }
    };
    fetchCameraPageSettings();
  }, []);
  // Add this useEffect in your PhotoboothPreview component
  // Add this useEffect to listen for camera settings updates
  useEffect(() => {
    const handleCameraSettingsUpdate = (e) => {
      setCameraPageSettings(e.detail.settings);
      console.log("Preview updated with camera settings:", e.detail.settings);
    };
  
    window.addEventListener('cameraSettingsUpdated', handleCameraSettingsUpdate);
  
    return () => {
      window.removeEventListener('cameraSettingsUpdated', handleCameraSettingsUpdate);
    };
  }, []);
  // Add scene settings fetch and update effects
  useEffect(() => {
    const fetchScenePageSettings = async () => {
      const { data } = await supabase
        .from('scene_page_settings')
        .select('*')
        .single();
      if (data) {
        setScenePageSettings(data);
      }
    };
    fetchScenePageSettings();
  }, []);

  // Add this useEffect in your PhotoboothPreview component
  useEffect(() => {
    const handleSceneSettingsUpdate = (e) => {
      setScenePageSettings(e.detail.settings);
      console.log("Preview updated with scene settings:", e.detail.settings);
     };
  
    window.addEventListener('sceneSettingsUpdated', handleSceneSettingsUpdate);
    
    return () => {
      window.removeEventListener('sceneSettingsUpdated', handleSceneSettingsUpdate);
    };
  }, []);

  // Mock functions
  const handleSubmit = (data) => {
    console.log("Form submitted in preview:", data);
    setCurrentStep('gender');
  };

  const handleStartClick = () => {
    if (settings.enable_data_collection) {
      setCurrentStep('form');
    } else {
      setCurrentStep('gender');
    }
  };

  const handleGenderSelect = (gender) => {
    console.log("Gender selected in preview:", gender);
    setCurrentStep('processing');
  };

  // Calculate position style based on form_position
  const getPositionStyle = () => {
    switch(settings.form_position) {
      case 'top':
        return { top: '10%' };
      case 'bottom':
        return { bottom: '10%' };
      case 'custom':
        return { top: `${settings.form_position_percent}%` };
      case 'middle':
      default:
        return { top: '50%', transform: 'translateY(-50%) translateX(-50%)' };
    }
  };

  // Get container style based on selected resolution
  const getContainerStyle = () => {
    const baseStyle = {
      transition: 'width 0.3s, height 0.3s',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
    
    switch(resolution) {
      case 'mobile':
        return { ...baseStyle, width: '375px', height: '667px' };
      case 'tablet':
        return { ...baseStyle, width: '768px', height: '1024px' };
      case 'desktop-vertical':
        return { 
          ...baseStyle, 
          width: '540px',
          height: '960px',
          maxWidth: '100%', 
          maxHeight: '90vh'
        };
      case 'desktop':
      default:
        return { 
          ...baseStyle, 
          width: '960px', 
          height: '540px', 
          maxWidth: '100%', 
          maxHeight: '90vh' 
        };
    }
  };

  // Fetch gender button settings on mount and when updated
  useEffect(() => {
    const fetchGenderButtonSettings = async () => {
      try {
        // Modified to get only the first row by ordering by id and limiting to 1
        const { data, error } = await supabase
          .from('genderbuttontable')
          .select('*')
          .order('id', { ascending: true })
          .limit(1);
        
        if (error) throw error;
          
        // Use the first row if available
        if (data && data.length > 0) { 
          setGenderButtonSettings(data[0]);
          console.log("Preview loaded gender settings:", data[0]);
        }
      } catch (error) {
        console.error("Error loading gender button settings in preview:", error);
      }
    };
    
    fetchGenderButtonSettings();
  }, [settings]); // Re-fetch when settings change

  // Add useEffect to fetch theme page settings
  useEffect(() => {
    const fetchThemePageSettings = async () => {
      const { data } = await supabase
        .from('theme_page_settings')
        .select('*')
        .single();
      if (data) {
        setThemePageSettings(data);
      }
    };
    fetchThemePageSettings();
    console.log("Preview loaded theme page settings:", themePageSettings);
  }, []);
  // Add this useEffect after your existing useEffects
  useEffect(() => {
    const handleThemeSettingsUpdate = (e) => {
      setThemePageSettings(e.detail.settings);
      console.log("Preview loaded theme settings:", e.detail.settings);
    };
  
    window.addEventListener('themeSettingsUpdated', handleThemeSettingsUpdate);
    
    return () => {
      window.removeEventListener('themeSettingsUpdated', handleThemeSettingsUpdate);
    };
  }, []);
 
  return (
    <div className="w-full h-full flex flex-col p-20 ">
      <div className="bg-gray-800 p-2 flex items-center justify-between">
        <div className="text-white text-sm">Preview Resolution:</div>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-xs rounded ${resolution === 'mobile' ? 'bg-violet-600 text-white' : 'bg-gray-600 text-gray-200'}`}
            onClick={() => setResolution('mobile')}
          >
            Mobile (375×667)
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded ${resolution === 'tablet' ? 'bg-violet-600 text-white' : 'bg-gray-600 text-gray-200'}`}
            onClick={() => setResolution('tablet')}
          >
            Tablet (768×1024)
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded ${resolution === 'desktop' ? 'bg-violet-600 text-white' : 'bg-gray-600 text-gray-200'}`}
            onClick={() => setResolution('desktop')}
          >
            Desktop (Full)
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded ${resolution === 'desktop-vertical' ? 'bg-violet-600 text-white' : 'bg-gray-600 text-gray-200'}`}
            onClick={() => setResolution('desktop-vertical')}
          >
            Desktop (vertical)
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center bg-gray-700 overflow-auto p-8">
        <div className="bg-gray-100 relative overflow-hidden shadow-xl"
          style={{
            ...getContainerStyle(),
            backgroundImage: currentStep === 'form' && settings?.userForm_background_url 
              ? `url(${settings.userForm_background_url})` 
              : settings?.background_url 
                ? `url(${settings.background_url})` 
                : 'none',
          }}
        >
          {/* Preview step controls */}
          <div className="absolute top-2 right-2 z-50 bg-gray-800 bg-opacity-70 rounded-md p-1 flex space-x-1">
            <button 
              className={`px-2 py-1 text-xs rounded ${currentStep === 'welcome' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'}`}
              onClick={() => setCurrentStep('welcome')}
            >
              Welcome
            </button>
            {settings.enable_data_collection && (
              <button 
                className={`px-2 py-1 text-xs rounded ${currentStep === 'form' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'}`}
                onClick={() => setCurrentStep('form')}
              >
                Form
              </button>
            )}
            <button 
              className={`px-2 py-1 text-xs rounded ${currentStep === 'gender' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'}`}
              onClick={() => setCurrentStep('gender')}
            >
              Gender
            </button>
            <button 
              className={`px-2 py-1 text-xs rounded ${currentStep === 'themes' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'}`}
              onClick={() => setCurrentStep('themes')}
            >
              Themes
            </button>
            <button 
              className={`px-2 py-1 text-xs rounded ${currentStep === 'scenes' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'}`}
              onClick={() => setCurrentStep('scenes')}
            >
              Scenes
            </button>
            <button 
              className={`px-2 py-1 text-xs rounded ${currentStep === 'camera' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'}`}
              onClick={() => setCurrentStep('camera')}
            >
              camera
            </button>
            <button 
              className={`px-2 py-1 text-xs rounded ${currentStep === 'processing' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'}`}
              onClick={() => setCurrentStep('processing')}
            >
              Processing
            </button>
          </div>
          
          {/* Welcome screen */}
          {currentStep === 'welcome' && (
            <div className="absolute inset-0 flex flex-col items-center">
              <div className="relative" style={{
                position: 'absolute',
                top: `${settings?.start_button_position_percent || 50}%`,
                transform: 'translateY(-50%)'
              }}>
                <button
                  className="rounded-md shadow-lg flex items-center justify-center"
                  style={{
                    backgroundColor: settings?.start_button_bg_color || '#8b5cf6',
                    color: settings?.start_button_text_color || '#FFFFFF',
                    width: `${settings?.start_button_width || 312}px`,
                    height: `${settings?.start_button_height || 86}px`,
                    fontSize: `${settings?.start_button_font_size || 1.25}rem`,
                    backgroundImage: settings?.start_button_background ? `url(${settings.start_button_background})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                  onClick={handleStartClick}
                >
                  {settings?.start_button_text || "Start"}
                </button>
              </div>
            </div>
          )}
          
          {/* User form overlay */}
          {currentStep === 'form' && (
            <UserForm
              onSubmit={handleSubmit}
              requireName={settings.require_name}
              requireEmail={settings.enable_email_collection}
              position={settings.form_position}
              style={getPositionStyle()}
              formFields={settings.custom_form_fields || []}
              formTitle={settings.form_title}
              buttonText={settings.button_text}
              buttonStyle={settings.button_style || {}}
              formStyle={settings.form_style || {}}
              buttonBackgroundUrl={settings.continue_button_background}
            />
          )}
          
          {/* Gender selection screen */}
          {currentStep === 'scenes' && (
  <SceneSlider 
    scenes={[
      'redcarpet/male/1.png',
      'redcarpet/male/2.png',
      'redcarpet/male/3.png'
    ]}
    onSelect={() => {
      console.log("Scene selected in preview");
      setCurrentStep('processing');
    }}
    scenePageSettings={scenePageSettings}
  />
)}
     
{currentStep === 'gender' && (
  <div className="absolute inset-0 flex flex-col items-center justify-center">
  <h2 
  className="text-3xl font-bold mb-8" 
  style={{ 
    color: genderButtonSettings?.gender_title_color || '#FFFFFF',
    fontSize: `${genderButtonSettings?.title_font_size || 24}px`
  }}
>
  {genderButtonSettings?.gender_selection_title || "Select Your Gender"}
</h2>

    
    <div className={`flex ${genderButtonSettings?.button_layout === 'column' ? 'flex-col space-y-6' : 'flex-row space-x-6'}`}>
      <button
        className="rounded-lg shadow-lg flex items-center justify-center"
        style={{
          color: genderButtonSettings?.gender_button_text_color || '#FFFFFF',
          backgroundImage: genderButtonSettings?.male_button_background ? `url(${genderButtonSettings.male_button_background})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: `${genderButtonSettings?.gender_button_width || 250}px`,
          height: `${genderButtonSettings?.gender_button_height || 250}px`,
        }}
        onClick={() => handleGenderSelect('male')}
      >
      </button>
      
      <button
        className="rounded-lg shadow-lg flex items-center justify-center"
        style={{
          color: genderButtonSettings?.gender_button_text_color || '#FFFFFF',
          backgroundImage: genderButtonSettings?.female_button_background ? `url(${genderButtonSettings.female_button_background})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: `${genderButtonSettings?.gender_button_width || 250}px`,
          height: `${genderButtonSettings?.gender_button_height || 250}px`,
        }}
        onClick={() => handleGenderSelect('female')}
      >
      </button>
    </div>
  </div>
)}

          
          {/* Processing screen */}
          {currentStep === 'processing' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gray-100">
              <div className="text-2xl font-bold mb-4">Processing...</div>
              <div className="w-16 h-16 border-t-4 border-violet-600 border-solid rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Your photo is being generated</p>
              <button 
                className="mt-8 px-4 py-2 bg-gray-200 text-gray-700 rounded"
                onClick={() => setCurrentStep('welcome')}
              >
                Reset Preview
              </button>
            </div>
          )}

{currentStep === 'themes' && (
 
  
      <ThemeSlider 
        themes={[
          { id: 1, name: "Red Carpet", image: redcarpet },
          { id: 2, name: "Space", image: outerspace },
          { id: 3, name: "Sci-fi", image: Scifi },
          { id: 4, name: "Sports", image: sports },
          { id: 5, name: "Superheros", image: superheros },
        ]}
        onSelect={() => {}}
        showThemeName={themePageSettings?.show_theme_name}
        buttonStyle={{
          backgroundColor: themePageSettings?.button_bg_color,
          color: themePageSettings?.button_text_color,
        }}
        themePageSettings={themePageSettings}
      />
 
)}

{currentStep === 'camera' && (

      <CameraView
        videoRef={videoRef}
        canvasRef={canvasRef}
        onCapture={handleCapture}
        userDetails={userDetails}
        selectedImage={selectedScene}
        cameraPageSettings={cameraPageSettings}
      />
   
)}
        </div>
      </div>
    </div>
  );
}

export default PhotoboothPreview;

