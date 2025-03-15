import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CameraView } from "../components/camera/CameraView";
import { GenderSelector } from "../components/forms/GenderSelector";
import { UserForm } from "../components/forms/UserForm";
import { THEMES } from "../constants/themes";
import { useBackgrounds } from "../contexts/BackgroundContext";
import { useCamera } from "../hooks/useCamera";
import SceneSlider from "../SceneSlider";
import { getScenePageSettings, getSettings, getThemePageSettings } from "../services/settingsService";
import { getActiveThemes } from "../services/themeService";
import { supabase } from "../supabaseClient"; // Add this import
import { ThemeSlider } from "../theme-slider";

function PhotoBooth({ previewMode = false, previewSettings = null }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("loading");
  const [userDetails, setUserDetails] = useState({ name: "", email: "", gender: "" });
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedScene, setSelectedScene] = useState(null);
  const [themePageSettings, setThemePageSettings] = useState(null);
  const [scenePageSettings, setScenePageSettings] = useState(null);
  const [cameraPageSettings, setCameraPageSettings] = useState(null); // Add this state
  const { videoRef, canvasRef, isCameraOn, setIsCameraOn, captureImage } = useCamera();
  const { backgrounds } = useBackgrounds();
  const [themes, setThemes] = useState([]);
  const [settings, setSettings] = useState(previewSettings || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (previewSettings) {
      setSettings(previewSettings);
      setLoading(false);
      return;
    }

    // In the useEffect where you fetch data, update the camera settings fetch:
    const fetchData = async () => {
      try {
        const themesData = await getActiveThemes();
        if (themesData?.length) setThemes(themesData);

        const settingsData = await getSettings();
        if (settingsData) {
          setSettings(settingsData);
          setCurrentStep(settingsData?.enable_data_collection ? "userForm" : "start");
        }

        const themeSettings = await getThemePageSettings();
        if (themeSettings) setThemePageSettings(themeSettings);

        const sceneSettings = await getScenePageSettings();
        if (sceneSettings) setScenePageSettings(sceneSettings);
        
        // Improved camera settings fetch with fallback
        try {
          const { data: cameraSettings, error } = await supabase
            .from('camera_page_settings')
            .select('*')
            .single();
          
          if (error) throw error;
          
          if (cameraSettings) {
            console.log("Camera settings loaded:", cameraSettings);
            setCameraPageSettings(cameraSettings);
          } else {
            // Set default camera settings if none found
            const defaultSettings = {
              header_text: "Smile for the camera!",
              header_color: "#FFFFFF",
              header_font_size: 24,
              button_color: "#8b5cf6",
              overlay_image: ""
            };
            console.log("Using default camera settings:", defaultSettings);
            setCameraPageSettings(defaultSettings);
          }
        } catch (cameraError) {
          console.error("Error fetching camera settings:", cameraError);
          // Set default camera settings on error
          setCameraPageSettings({
            header_text: "Smile for the camera!",
            header_color: "#FFFFFF",
            header_font_size: 24,
            button_color: "#8b5cf6",
            overlay_image: ""
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCurrentStep("start");
      } finally {
        setLoading(false);
      }
    };

    if (!previewMode) fetchData();
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
    navigate("/swap", { state: { sourceImage: imageBlob, userDetails, selectedImage: selectedScene }});
  };

  // Update the camera step to pass cameraPageSettings
  const renderStep = () => {
    switch (currentStep) {
      case "start":
        return (
          <div className="absolute inset-0 flex flex-col items-center">
            <div className="relative" style={{
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
                }}
                onClick={() => setCurrentStep(settings?.enable_data_collection ? "userForm" : "gender")}
              >
                Start
              </button>
            </div>
          </div>
        );

      case "userForm":
        return (
          <UserForm
            onSubmit={handleUserFormSubmit}
            requireName={settings?.require_name}
            requireEmail={settings?.enable_email_collection}
            formFields={settings?.custom_form_fields || []}
            formTitle={settings?.form_title || "Please Enter Your Details"}
            buttonText={settings?.button_text || "Continue"}
            buttonStyle={settings?.button_style || {}}
            formStyle={settings?.form_style || {}}
            buttonBackgroundUrl={settings?.continue_button_background || ""}
          />
        );

      case "gender":
        return <GenderSelector onSelect={handleGenderSelect} />;

      case "theme":
        return <ThemeSlider
          themes={themes.length ? themes : THEMES}
          onSelect={handleThemeSelect}
          themePageSettings={themePageSettings}
        />;

      case "scene":
        let scenes = [];
        if (selectedTheme?.male_scenes && selectedTheme?.female_scenes) {
          scenes = userDetails.gender === 'male' ? selectedTheme.male_scenes : selectedTheme.female_scenes;
        } else {
          const imageFolder = `${selectedTheme.name.toLowerCase().replace(" ", "")}/${userDetails.gender}`;
          scenes = [`${imageFolder}/1.png`, `${imageFolder}/2.png`, `${imageFolder}/3.png`];
        }
        return <SceneSlider scenes={scenes} onSelect={handleSceneSelect} scenePageSettings={scenePageSettings} />;

      case "camera":
        return (
          <CameraView
            videoRef={videoRef}
            canvasRef={canvasRef}
            onCapture={handleCapture}
            userDetails={userDetails}
            selectedImage={selectedScene}
            cameraPageSettings={cameraPageSettings} // Pass camera settings here
          />
        );

      default:
        return <div>Something went wrong</div>;
    }
  };

  const getBackgroundImage = () => {
    if (currentStep === "userForm" && backgrounds?.userForm) return backgrounds.userForm;
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
      {renderStep()}
    </section>
  );
}

export default PhotoBooth;