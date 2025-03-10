import { useEffect, useState } from "react";
import { AdminNav } from "../components/admin/AdminNav";
import { getSettings, updateSettings } from "../services/settingsService";
import { uploadButtonBackground, getButtonBackgrounds } from "../services/backgroundService";

function SettingsAdmin() {
  const [settings, setSettings] = useState({
    app_title: "AI PhotoBooth",
    welcome_message: "Welcome to the AI PhotoBooth!",
    privacy_policy: "", // Ensure this is an empty string
    terms_of_service: "", // Ensure this is an empty string
    max_photo_size_mb: 5,
    enable_data_collection: true,
    enable_email_collection: true,
    require_name: true,
    require_gender: true,
    enable_analytics: false,
    form_position: "center", // Add form position setting
    start_button_background: "", // Add button background settings
    continue_button_background: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [buttonBackgrounds, setButtonBackgrounds] = useState([]);
  const [uploadingButton, setUploadingButton] = useState(false);
  const [newButtonBackground, setNewButtonBackground] = useState(null);
  const [buttonType, setButtonType] = useState("start"); // "start" or "continue"

  useEffect(() => {
    fetchSettings();
    fetchButtonBackgrounds();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await getSettings();
      if (data) {
        // Ensure all text fields have string values (not null)
        const sanitizedData = {
          ...data,
          privacy_policy: data.privacy_policy || "",
          terms_of_service: data.terms_of_service || ""
        };
        
        // Merge with defaults
        setSettings(prevSettings => ({
          ...prevSettings,
          ...sanitizedData
        }));
      }
    } catch (error) {
      setMessage({ text: "Failed to load settings", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchButtonBackgrounds = async () => {
    try {
      const data = await getButtonBackgrounds();
      setButtonBackgrounds(data);
    } catch (error) {
      console.error("Failed to load button backgrounds", error);
      // Don't show an error message to the user, just log it
      // The UI will handle the empty state gracefully
    }
  };

  const handleButtonFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setNewButtonBackground(file);
    } else {
      setMessage({ text: "Please select an image file", type: "error" });
    }
  };

  const handleButtonUpload = async (e) => {
    e.preventDefault();
    
    if (!newButtonBackground) {
      setMessage({ text: "Please select an image to upload", type: "error" });
      return;
    }
    
    setUploadingButton(true);
    setMessage({ text: "", type: "" });
    
    try {
      const url = await uploadButtonBackground(newButtonBackground, buttonType);
      
      // Update settings with the new button background
      setSettings(prev => ({
        ...prev,
        [buttonType === "start" ? "start_button_background" : "continue_button_background"]: url
      }));
      
      // Reset form
      setNewButtonBackground(null);
      document.getElementById("button-file-upload").value = "";
      setMessage({ text: "Button background uploaded successfully!", type: "success" });
      fetchButtonBackgrounds();
    } catch (error) {
      setMessage({ text: "Failed to upload button background", type: "error" });
    } finally {
      setUploadingButton(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : 
              type === "number" ? parseFloat(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      await updateSettings(settings);
      setMessage({ text: "Settings saved successfully", type: "success" });
    } catch (error) {
      setMessage({ text: "Failed to save settings", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6 text-violet-800">Application Settings</h1>
          
          {/* Message display */}
          {message.text && (
            <div className={`p-4 mb-6 rounded-md ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message.text}
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading settings...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-xl font-semibold mb-4">General Settings</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Application Title</label>
                      <input
                        type="text"
                        name="app_title"
                        value={settings.app_title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Welcome Message</label>
                      <input
                        type="text"
                        name="welcome_message"
                        value={settings.welcome_message}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Max Photo Size (MB)</label>
                      <input
                        type="number"
                        name="max_photo_size_mb"
                        value={settings.max_photo_size_mb}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        min="1"
                        max="20"
                        step="0.5"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-xl font-semibold mb-4">Form Position & Appearance</h2>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Form Position</label>
                    <select
                      name="form_position"
                      value={settings.form_position}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="middle">Middle (50%)</option>
                      <option value="top">Top (20%)</option>
                      <option value="bottom">Bottom (80%)</option>
                    </select>
                  </div>
                  
                  {/* Button Background Upload */}
                  <div className="mb-4 p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Button Backgrounds</h3>
                    
                    <div className="mb-3">
                      <label className="block text-gray-700 mb-2">Button Type</label>
                      <select
                        value={buttonType}
                        onChange={(e) => setButtonType(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="start">Start Button</option>
                        <option value="continue">Continue Button</option>
                      </select>
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-gray-700 mb-2">Select Image</label>
                      <input
                        id="button-file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleButtonFileChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleButtonUpload}
                      disabled={uploadingButton}
                      className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 disabled:bg-gray-400"
                    >
                      {uploadingButton ? "Uploading..." : "Upload Button Background"}
                    </button>
                    
                    {/* Display current button backgrounds */}
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold mb-2">Start Button:</p>
                        {settings.start_button_background ? (
                          <img 
                            src={settings.start_button_background} 
                            alt="Start Button Background" 
                            className="w-full h-20 object-cover rounded-md"
                          />
                        ) : (
                          <p className="text-gray-500">No background set</p>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Continue Button:</p>
                        {settings.continue_button_background ? (
                          <img 
                            src={settings.continue_button_background} 
                            alt="Continue Button Background" 
                            className="w-full h-20 object-cover rounded-md"
                          />
                        ) : (
                          <p className="text-gray-500">No background set</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-xl font-semibold mb-4">User Data Collection</h2>
                  
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="enable_data_collection"
                        checked={settings.enable_data_collection}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Enable user data collection form</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="enable_email_collection"
                        checked={settings.enable_email_collection}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Collect user email addresses</span>
                    </label>
                    
                    {/* Rest of the checkboxes remain the same */}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Legal Information</h2>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Privacy Policy</label>
                    <textarea
                      name="privacy_policy"
                      value={settings.privacy_policy}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows="6"
                      placeholder="Enter your privacy policy text here..."
                    ></textarea>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Terms of Service</label>
                    <textarea
                      name="terms_of_service"
                      value={settings.terms_of_service}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows="6"
                      placeholder="Enter your terms of service text here..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Form Vertical Position (% from top)</label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      name="form_position_percent"
                      value={settings.form_position_percent || 50}
                      onChange={handleInputChange}
                      className="w-24 p-2 border border-gray-300 rounded-md mr-2"
                      min="5"
                      max="95"
                      step="5"
                    />
                    <span>%</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Position from the top of the screen (default: 50%)</p>
                </div>
              </div>
              
              <div className="mt-8 text-right">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 disabled:bg-gray-400"
                >
                  {saving ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsAdmin;