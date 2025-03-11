import { useEffect, useState } from "react";
import { AdminNav } from "../components/admin/AdminNav";
import { PhotoboothPreview } from "../components/admin/PhotoboothPreview";
import {
  deleteBackground,
  getAllBackgrounds,
  toggleBackgroundStatus,
  uploadBackground
} from "../services/backgroundService";

function Admin() {
  const [backgrounds, setBackgrounds] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [newBackground, setNewBackground] = useState(null);
  const [backgroundName, setBackgroundName] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [settings, setSettings] = useState({
    app_title: "AI PhotoBooth",
    welcome_message: "Welcome to the AI PhotoBooth!",
    // ... other default settings ...
  });

  // Fetch existing backgrounds on component mount
  useEffect(() => {
    fetchBackgrounds();
  }, []);

  const fetchBackgrounds = async () => {
    try {
      const data = await getAllBackgrounds();
      setBackgrounds(data);
    } catch (error) {
      setMessage({ text: "Failed to load backgrounds", type: "error" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setNewBackground(file);
      } else {
        setMessage({ text: "Please select an image file", type: "error" });
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!newBackground) {
      setMessage({ text: "Please select an image to upload", type: "error" });
      return;
    }
  
    // Remove .toLowerCase() from the check
    if (!["default", "userForm"].includes(backgroundName)) {
      setMessage({ 
        text: "Background name must be exactly 'default' or 'userForm'", 
        type: "error" 
      });
      return;
    }
  
    // Rest of the code remains the same
    if (!backgroundName.trim()) {
      setMessage({ text: "Please enter a name for the background", type: "error" });
      return;
    }
  
    setUploading(true);
    setMessage({ text: "", type: "" });
  
    try {
      await uploadBackground(newBackground, backgroundName);
      
      // Reset form and refresh list
      setNewBackground(null);
      setBackgroundName("");
      document.getElementById("file-upload").value = "";
      setMessage({ text: "Background uploaded successfully!", type: "success" });
      fetchBackgrounds();
      
      // Refresh the backgrounds in the context
      if (typeof refreshBackgrounds === 'function') {
        refreshBackgrounds();
      }
    } catch (error) {
      setMessage({ text: "Failed to upload background", type: "error" });
    } finally {
      setUploading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleBackgroundStatus(id, currentStatus);
      setMessage({ text: "Background status updated", type: "success" });
      fetchBackgrounds();
    } catch (error) {
      setMessage({ text: "Failed to update background status", type: "error" });
    }
  };

  const handleDelete = async (id, url) => {
    if (!window.confirm("Are you sure you want to delete this background?")) return;

    try {
      await deleteBackground(id, url);
      setMessage({ text: "Background deleted successfully", type: "success" });
      fetchBackgrounds();
    } catch (error) {
      setMessage({ text: "Failed to delete background", type: "error" });
    }
  };

  // Add this function to find the active background
  const getActiveBackground = (name) => {
    const bg = backgrounds.find(b => b.name === name && b.is_active);
    return bg ? bg.url : null;
  };

  // Update the settings object with background URLs
  useEffect(() => {
    if (backgrounds.length > 0) {
      setSettings(prevSettings => ({
        ...prevSettings,
        background_url: getActiveBackground('default'),
        userForm_background_url: getActiveBackground('userForm')
      }));
    }
  }, [backgrounds]);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      
      <div className="flex  mx-auto py-8 px-4">
        {/* Left side - Background Management */}
        <div className="w-1/3 pr-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-6 text-violet-800">Background Image Management</h1>
            
            {/* Message display */}
            {message.text && (
              <div className={`p-4 mb-6 rounded-md ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {message.text}
              </div>
            )}
            
            {/* Upload form */}
            <form onSubmit={handleUpload} className="mb-8 p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Upload New Background</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Background Name</label>
                <select
                  value={backgroundName}
                  onChange={(e) => setBackgroundName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white"
                >
                  <option value="" disabled>Select background type</option>
                  <option value="default">Staring Screen Background</option>
                  <option value="userForm">other screen Background</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  "default" is used for the main screen, "userForm" for the form screen
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Image</label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <button
                type="submit"
                disabled={uploading}
                className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 disabled:bg-gray-400"
              >
                {uploading ? "Uploading..." : "Upload Background"}
              </button>
            </form>
            
            {/* Backgrounds list */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Manage Backgrounds</h2>
              
              {backgrounds.length === 0 ? (
                <p className="text-gray-500">No backgrounds found</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {backgrounds.map((bg) => (
                    <div key={bg.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={bg.url} 
                          alt={bg.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">{bg.name}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <button
                            onClick={() => handleToggleStatus(bg.id, bg.is_active)}
                            className={`px-3 py-1 rounded-md ${bg.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                          >
                            {bg.is_active ? "Active" : "Inactive"}
                          </button>
                          <button
                            onClick={() => handleDelete(bg.id, bg.url)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-md"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Preview */}
        <div className="w-2/3 bg-gray-800 relative">
          <div className="absolute inset-0 flex flex-col">
            <div className="bg-gray-700 text-white p-2 flex justify-between items-center">
              <h3 className="font-medium">App Preview</h3>
            </div>
            <div className="flex-1 overflow-auto bg-gray-700">
              <div className="h-full flex items-center justify-center p-4">
                <PhotoboothPreview settings={settings} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;