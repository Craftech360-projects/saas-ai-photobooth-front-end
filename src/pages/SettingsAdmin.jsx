import { useState, useEffect } from "react";
import { AdminNav } from "../components/admin/AdminNav";
import { getSettings, updateSettings } from "../services/settingsService";

function SettingsAdmin() {
  const [settings, setSettings] = useState({
    app_title: "AI PhotoBooth",
    welcome_message: "Welcome to the AI PhotoBooth!",
    privacy_policy: "",
    terms_of_service: "",
    max_photo_size_mb: 5,
    enable_email_collection: true,
    require_name: true,
    require_gender: true,
    enable_analytics: false
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await getSettings();
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      setMessage({ text: "Failed to load settings", type: "error" });
    } finally {
      setLoading(false);
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
                  <h2 className="text-xl font-semibold mb-4">User Data Collection</h2>
                  
                  <div className="space-y-3">
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
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="require_name"
                        checked={settings.require_name}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Require user name</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="require_gender"
                        checked={settings.require_gender}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Require gender selection</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="enable_analytics"
                        checked={settings.enable_analytics}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Enable usage analytics</span>
                    </label>
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