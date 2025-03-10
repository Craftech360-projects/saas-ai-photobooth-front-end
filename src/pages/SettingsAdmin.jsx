import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminNav } from "../components/admin/AdminNav";
import { PhotoboothPreview } from "../components/admin/PhotoboothPreview";
import CustomFormFields from "../components/admin/settings/CustomFormFields";
import GeneralSettings from "../components/admin/settings/GeneralSettings";
import UserFormCustomization from "../components/admin/settings/UserFormCustomization";
import { getButtonBackgrounds, uploadButtonBackground } from "../services/backgroundService";
import { getSettings, updateSettings } from "../services/settingsService";

function SettingsAdmin() {
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
  
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showFormPreview, setShowFormPreview] = useState(false);
  const [buttonBackgrounds, setButtonBackgrounds] = useState([]);
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
          setSettings(data);
        }
        
        const backgrounds = await getButtonBackgrounds();
        if (backgrounds) {
          setButtonBackgrounds(backgrounds);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        setMessage({ text: "Failed to load settings. Please try again.", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

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
      await updateSettings(settings);
      setMessage({ text: "Settings saved successfully!", type: "success" });
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage({ text: "Failed to save settings. Please try again.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left side - Settings */}
        <div className="w-1/2 overflow-y-auto p-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-6 text-violet-800">Application Settings</h1>
            
            {/* Message display */}
            {message.text && (
              <div className={`p-4 mb-6 rounded-md ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {message.text}
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
                
                {/* User Form Customization Section */}
                <UserFormCustomization 
                  settings={settings} 
                  handleInputChange={handleInputChange}
                  setSettings={setSettings}
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
        <div className="w-1/2 bg-gray-800 relative">
          <div className="absolute inset-0 flex flex-col">
            <div className="bg-gray-700 text-white p-2 flex justify-between items-center">
              <h3 className="font-medium">Live Preview</h3>
              <Link 
                to="/" 
                target="_blank" 
                className="text-sm text-blue-300 hover:text-blue-100"
              >
                Open in New Tab
              </Link>
            </div>
            <div className="flex-1 overflow-auto">
              <PhotoboothPreview settings={settings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsAdmin;