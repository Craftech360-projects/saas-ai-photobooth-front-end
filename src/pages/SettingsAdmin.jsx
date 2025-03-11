import { useEffect, useState } from "react";
import { AdminNav } from "../components/admin/AdminNav";
import { PhotoboothPreview } from "../components/admin/PhotoboothPreview";
import CustomFormFields from "../components/admin/settings/CustomFormFields";
import GenderPageSettings from "../components/admin/settings/GenderPageSettings";
import GeneralSettings from "../components/admin/settings/GeneralSettings";
import StartPageSettings from "../components/admin/settings/StartPageSettings";
import UserFormCustomization from "../components/admin/settings/UserFormCustomization";
import { useBackgrounds } from "../contexts/BackgroundContext";
import { getButtonBackgrounds, uploadButtonBackground } from "../services/backgroundService";
import { getSettings, saveGenderButtonSettings, updateSettings } from "../services/settingsService";

function SettingsAdmin() {
  // Get backgrounds from context
  const { backgrounds, setBackgrounds, loading: backgroundsLoading } = useBackgrounds();
  
  // In your initial state definition
  const [settings, setSettings] = useState({
    app_title: "",
    welcome_message: "",
    form_title: "Enter Your Information",
    button_text: "Continue",
    enable_data_collection: true,
    require_name: true,
    enable_email_collection: true,
    form_position: "middle",
    form_position_percent: 50,
    custom_form_fields: [], // Ensure this is initialized as an empty array
    form_style: {
      backgroundColor: "#ffffff",
      color: "#000000",
      borderRadius: "8px",
      borderColor: "#cccccc",
      borderWidth: "1px",
      borderStyle: "solid",
      opacity: 1,
      inputBackgroundColor: "#ffffff",
      inputTextColor: "#000000",
      inputBorderColor: "#cccccc",
      inputBorderRadius: "4px",
      labelFontSize: "16px",
      labelFontWeight: "normal",
      labelFontStyle: "normal",
      labelColor: "#000000"
    },
    button_style: {
      width: "312px",
      height: "86px",
      backgroundColor: "#8b5cf6",
      color: "#ffffff",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "normal",
      alignSelf: "center",
      useCustomBackground: false
    }
  });
  
  // Update settings with backgrounds from context
  useEffect(() => {
    if (backgrounds) {
      setSettings(prevSettings => ({
        ...prevSettings,
        background_url: backgrounds.default,
        // Remove or rename this field to match your database schema
        // userForm_background_url: backgrounds.userForm
        user_form_background: backgrounds.userForm // Use the column name that exists in your database
      }));
    }
  }, [backgrounds]);

  // Update this section around line 70-80
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showFormPreview, setShowFormPreview] = useState(false);
  const [buttonBackgrounds, setButtonBackgrounds] = useState([]); // This is initialized here
  const [uploadingBackground, setUploadingBackground] = useState(false);
  const [newCustomField, setNewCustomField] = useState({
    name: "",
    label: "",
    type: "text",
    placeholder: "",
    required: false,
    options: ""
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        if (data) {
          setSettings(prevSettings => ({
            ...data,
            // Preserve background URLs from context if they exist
            background_url: backgrounds.default || data.background_url,
            // Update this line to use the correct column name
            user_form_background: backgrounds.userForm || data.user_form_background
          }));
        }
        
        const bgData = await getButtonBackgrounds();
        if (bgData) {
          setButtonBackgrounds(bgData); // Use setButtonBackgrounds here, not setBackgrounds2
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        setMessage({ text: "Failed to load settings. Please try again.", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [backgrounds]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleCustomFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCustomField({
      ...newCustomField,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // In the addCustomField function
  const addCustomField = () => {
    // Ensure custom_form_fields is initialized as an array
    const currentFields = Array.isArray(settings.custom_form_fields) ? settings.custom_form_fields : [];
    
    setSettings({
      ...settings,
      custom_form_fields: [
        ...currentFields,
        { ...newCustomField, id: Date.now() }
      ]
    });
    
    // Reset the new field form
    setNewCustomField({
      label: "",
      name: "",
      type: "text",
      required: false,
      placeholder: ""
    });
  };

  const removeCustomField = (index) => {
    const updatedFields = [...settings.custom_form_fields];
    updatedFields.splice(index, 1);
    
    setSettings({
      ...settings,
      custom_form_fields: updatedFields
    });
    
    setMessage({ text: "Custom field removed.", type: "success" });
  };

  const toggleFormPreview = () => {
    setShowFormPreview(!showFormPreview);
  };

  const handleBackgroundUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setMessage({ text: "Please upload a valid image file (JPEG, PNG, GIF).", type: "error" });
      return;
    }

    setUploadingBackground(true);
    setMessage({ text: "Uploading background image...", type: "info" });

    try {
      const uploadedUrl = await uploadButtonBackground(file);
      
      if (type === 'start') {
        setSettings({
          ...settings,
          start_button_background: uploadedUrl
        });
      } else {
        setSettings({
          ...settings,
          continue_button_background: uploadedUrl
        });
      }
      
      setMessage({ text: "Background image uploaded successfully.", type: "success" });
    } catch (error) {
      console.error("Error uploading background:", error);
      setMessage({ text: "Failed to upload background image. Please try again.", type: "error" });
    } finally {
      setUploadingBackground(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "Saving settings...", type: "info" });
    
    try {
      // Save settings to the database
      await updateSettings(settings);
      
      // Only update backgrounds if setBackgrounds is available
      if (typeof setBackgrounds === 'function') {
        setBackgrounds({
          ...backgrounds,
          default: settings.background_url || backgrounds.default,
          userForm: settings.userForm_background_url || backgrounds.userForm
        });
      }
      
      // Store in sessionStorage for components that might not have direct access to this state
      sessionStorage.setItem('appSettings', JSON.stringify(settings));
      
      setMessage({ text: "Settings saved successfully!", type: "success" });
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage({ text: "Failed to save settings. Please try again.", type: "error" });
    }
  };

  const [genderSettingsMessage, setGenderSettingsMessage] = useState({ text: "", type: "" });

  const handleGenderSettingsSave = async () => {
    setGenderSettingsMessage({ text: "Saving gender settings...", type: "info" });

    try {
      // Extract only the gender-related settings
      const genderSettings = {
        gender_selection_title: settings.gender_selection_title,
        gender_title_color: settings.gender_title_color,
        gender_button_bg_color: settings.gender_button_bg_color,
        gender_button_text_color: settings.gender_button_text_color,
        gender_button_width: settings.gender_button_width,
        gender_button_height: settings.gender_button_height,
        male_button_background: settings.male_button_background,
        female_button_background: settings.female_button_background,
        filename: settings.filename || "default_filename", // Ensure filename is provided
        url: settings.url || "default_url" // Ensure url is provided
      };

      // Call a new service function to save gender settings to a separate table
      await saveGenderButtonSettings(genderSettings);
      console.log("success");
      setGenderSettingsMessage({ text: "Gender settings saved successfully!", type: "success" });
    } catch (error) {
      console.error("Error saving gender settings:", error);
      setGenderSettingsMessage({ text: "Failed to save gender settings. Please try again.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left side - Settings */}
        <div className="w-1/3 overflow-y-auto p-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-6 text-violet-800">Application Settings</h1>
            
            {/* Message display */}
            {message.text && (
              <div className={`p-4 mb-6 rounded-md ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {message.text}
              </div>
            )}

            {/* Gender Settings Message display */}
            {genderSettingsMessage.text && (
              <div className={`p-4 mb-6 rounded-md ${genderSettingsMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {genderSettingsMessage.text}
              </div>
            )}
            
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* General Settings Section */}
                <GeneralSettings 
                  settings={settings} 
                  handleInputChange={handleInputChange} 
                />
                
                {/* Start Page Settings Section */}
                <StartPageSettings
                  settings={settings}
                  setSettings={setSettings}
                />
                
                {/* User Form Customization Section */}
                <UserFormCustomization 
                  settings={settings} 
                  handleInputChange={handleInputChange}
                  setSettings={setSettings}
                />
                
                {/* Gender Page Settings Section */}
                <GenderPageSettings
                  settings={settings}
                  setSettings={setSettings}
                  setMessage={setGenderSettingsMessage}
                  onSave={handleGenderSettingsSave}
                  showSaveButton={true}
                />
                
                {/* Custom Form Fields Section */}
                <CustomFormFields 
                  settings={settings}
                  setSettings={setSettings}
                  newCustomField={newCustomField}
                  setNewCustomField={setNewCustomField}
                  handleCustomFieldChange={handleCustomFieldChange}
                  addCustomField={addCustomField}
                  removeCustomField={removeCustomField}
                  buttonType="continue"
                />
                
                {/* Button Background Upload Section */}
                <div className="mb-8 border-b pb-6">
                  <h2 className="text-xl font-semibold mb-4">Button Background Images</h2>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Continue Button Background</h3>
                      <div className="mb-4">
                        <input
                          type="file"
                          id="continue_button_bg"
                          accept="image/*"
                          onChange={(e) => handleBackgroundUpload(e, 'continue')}
                          className="hidden"
                          disabled={uploadingBackground}
                        />
                        <label
                          htmlFor="continue_button_bg"
                          className="block w-full p-2 text-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                        >
                          {uploadingBackground ? "Uploading..." : "Click to upload image"}
                        </label>
                      </div>
                      
                      {settings.continue_button_background && (
                        <div className="relative h-24 w-full bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={settings.continue_button_background}
                            alt="Continue Button Background"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Start Button Background</h3>
                      <div className="mb-4">
                        <input
                          type="file"
                          id="start_button_bg"
                          accept="image/*"
                          onChange={(e) => handleBackgroundUpload(e, 'start')}
                          className="hidden"
                          disabled={uploadingBackground}
                        />
                        <label
                          htmlFor="start_button_bg"
                          className="block w-full p-2 text-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                        >
                          {uploadingBackground ? "Uploading..." : "Click to upload image"}
                        </label>
                      </div>
                      
                      {settings.start_button_background && (
                        <div className="relative h-24 w-full bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={settings.start_button_background}
                            alt="Start Button Background"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                
                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-violet-600 text-white rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                  >
                    Save Settings
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        {/* Right side - Preview */}
        <div className="w-2/3 bg-gray-800 relative">
          <div className="absolute inset-0 flex flex-col">
            <div className="bg-gray-700 text-white p-2 flex justify-between items-center">
              <h3 className="font-medium">App Preview</h3>
              {backgroundsLoading && (
                <div className="text-xs text-gray-300">Loading backgrounds...</div>
              )}
            </div>
            <div className="flex-1 overflow-auto bg-gray-700">
              <div className="h-full flex items-center justify-center p-4">
                <PhotoboothPreview 
                  settings={{
                    ...settings,
                    background_url: settings.background_url || backgrounds.default,
                    user_form_background: settings.user_form_background || backgrounds.userForm
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsAdmin;
