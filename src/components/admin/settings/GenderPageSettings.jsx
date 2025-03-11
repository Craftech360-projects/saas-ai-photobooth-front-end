import { uploadButtonBackground } from '../../../services/backgroundService';

function GenderPageSettings({ settings, setSettings, setMessage, onSave, showSaveButton }) {
  const handleChange = (field, value) => {
    // Remove the incorrect code that was pasted here
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
    
    // If this is a color or size change, we might want to trigger a preview update
    if (field.includes('gender_button')) {
      console.log(`Updated ${field} to ${value}`);
    }
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setMessage({ text: "Please upload a valid image file (JPEG, PNG, GIF).", type: "error" });
      return;
    }

    setMessage({ text: "Uploading image...", type: "info" });

    try {
      const uploadedUrl = await uploadButtonBackground(file);
      handleChange(field, uploadedUrl);
      setMessage({ text: "Image uploaded successfully.", type: "success" });
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage({ text: "Failed to upload image. Please try again.", type: "error" });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Gender Selection Page Settings</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender Selection Title
        </label>
        <input
          type="text"
          value={settings.gender_selection_title || "Select Your Gender"}
          onChange={(e) => handleChange("gender_selection_title", e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Select Your Gender"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title Color
        </label>
        <input
          type="color"
          value={settings.gender_title_color || "#FFFFFF"}
          onChange={(e) => handleChange("gender_title_color", e.target.value)}
          className="w-full p-1 h-10 border rounded"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Button Style
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Button Background Color</label>
            <input
              type="color"
              value={settings.gender_button_bg_color || "#8b5cf6"}
              onChange={(e) => handleChange("gender_button_bg_color", e.target.value)}
              className="w-full p-1 h-10 border rounded"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Button Text Color</label>
            <input
              type="color"
              value={settings.gender_button_text_color || "#FFFFFF"}
              onChange={(e) => handleChange("gender_button_text_color", e.target.value)}
              className="w-full p-1 h-10 border rounded"
            />
          </div>
          
          {/* Button Width Slider */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Button Width: {settings.gender_button_width || 200}px
            </label>
            <input
              type="range"
              min="100"
              max="400"
              step="10"
              value={settings.gender_button_width || 200}
              onChange={(e) => handleChange("gender_button_width", parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          {/* Button Height Slider */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Button Height: {settings.gender_button_height || 60}px
            </label>
            <input
              type="range"
              min="40"
              max="200"
              step="10"
              value={settings.gender_button_height || 60}
              onChange={(e) => handleChange("gender_button_height", parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      {/* Male Button Background Image */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Male Button Background Image
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={settings.male_button_background || ""}
            onChange={(e) => handleChange("male_button_background", e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="URL to male button background image"
          />
          <button
            type="button"
            className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={() => document.getElementById('male_bg_upload').click()}
          >
            Browse
          </button>
        </div>
        <input
          id="male_bg_upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "male_button_background")}
        />
        
        {settings.male_button_background && (
          <div className="mt-2  h-auto w-40 bg-gray-100 rounded-md overflow-hidden">
            <img
              src={settings.male_button_background}
              alt="Male Button Background"
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
      
      {/* Female Button Background Image */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Female Button Background Image
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={settings.female_button_background || ""}
            onChange={(e) => handleChange("female_button_background", e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="URL to female button background image"
          />
          <button
            type="button"
            className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={() => document.getElementById('female_bg_upload').click()}
          >
            Browse
          </button>
        </div>
        <input
          id="female_bg_upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "female_button_background")}
        />
        
        {settings.female_button_background && (
          <div className="mt-2 h-auto w-40 bg-gray-100 rounded-md overflow-hidden">
            <img
              src={settings.female_button_background}
              alt="Female Button Background"
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
      
      {/* Add save button at the bottom */}
      {showSaveButton && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onSave}
            className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            Save Gender Settings
          </button>
        </div>
      )}
    </div>
  );
}

export default GenderPageSettings;