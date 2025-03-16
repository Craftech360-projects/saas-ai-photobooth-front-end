// Update the React import to include useState
// Add supabase import
import { useEffect, useState } from 'react';
import { uploadButtonBackground } from '../../../services/backgroundService';
import { supabase } from '../../../supabaseClient';

function GenderPageSettings({ settings, setSettings, setMessage, onSave, showSaveButton }) {
  const [genderButtonSettings, setGenderButtonSettings] = useState({});

  // Add this useEffect to watch for settings changes
  useEffect(() => {
    // Update the preview when settings change
    const event = new CustomEvent('genderSettingsUpdated', {
      detail: { settings: genderButtonSettings }
    });
    window.dispatchEvent(event);
  }, [genderButtonSettings]);

  // Fetch gender button settings on mount
  useEffect(() => {
    const fetchGenderButtonSettings = async () => {
      try {
        // First, check if we have any existing data
        const { data, error } = await supabase
          .from('genderbuttontable')
          .select('*')
          .order('id', { ascending: true })
          .limit(1);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setGenderButtonSettings(data[0]);
        } else {
          // In the useEffect where we create initial row
          const { data: newData, error: insertError } = await supabase
            .from('genderbuttontable')
            .insert([{
              gender_selection_title: "Select Your Gender",
              gender_title_color: "#FFFFFF",
              gender_button_width: 250,
              gender_button_height: 250,
              button_layout: "row" // Add default layout
            }])
            .select();
          
          if (insertError) throw insertError;
          
          if (newData && newData.length > 0) {
            setGenderButtonSettings(newData[0]);
          }
        }
      } catch (error) {
        console.error("Error loading gender button settings:", error);
      }
    };
    
    fetchGenderButtonSettings();
  }, []);

  // Update both local state and gender button table
  const handleChange = async (field, value) => {
    // Update local state
    setGenderButtonSettings(prev => ({
      ...prev,
      [field]: value
    }));
    
    try {
      // Get the first row's ID
      const { data: existingData } = await supabase
        .from('genderbuttontable')
        .select('id')
        .order('id', { ascending: true })
        .limit(1);
  
      if (existingData && existingData.length > 0) {
        // Update existing row
        const { error } = await supabase
          .from('genderbuttontable')
          .update({ [field]: value })
          .eq('id', existingData[0].id);
        
        if (error) throw error;
      }
    } catch (error) {
      console.error("Error updating gender button settings:", error);
    }
  };

  // Modify handleImageUpload to update existing row
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
      const fileExtension = file.name.split('.').pop();
      const timestamp = Date.now();
      const newFileName = field.includes('male') ? 
        `male_${timestamp}.${fileExtension}` : 
        `female_${timestamp}.${fileExtension}`;
      
      const renamedFile = new File([file], newFileName, { type: file.type });
      
      const uploadedUrl = await uploadButtonBackground(renamedFile);
      const cachebustedUrl = `${uploadedUrl}?t=${timestamp}`;
      
      // Update local states
      setSettings(prev => ({
        ...prev,
        [field]: cachebustedUrl
      }));
      
      setGenderButtonSettings(prev => ({
        ...prev,
        [field]: cachebustedUrl
      }));
      
      // Get the first row's ID and update it
      const { data: existingData } = await supabase
        .from('genderbuttontable')
        .select('id')
        .order('id', { ascending: true })
        .limit(1);
  
      if (existingData && existingData.length > 0) {
        const { error } = await supabase
          .from('genderbuttontable')
          .update({ [field]: cachebustedUrl })
          .eq('id', existingData[0].id);
        
        if (error) throw error;
      }
      
      setMessage({ text: "Image uploaded successfully.", type: "success" });
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage({ text: "Failed to upload image. Please try again.", type: "error" });
    }
  };
   // Add this function to handle save
   const handleSave = async () => {
    if (onSave) {
      // Pass the entire genderButtonSettings object to the parent
      onSave(genderButtonSettings);
    }
  };
  // Update all references from settings to genderButtonSettings
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Gender Selection Page Settings</h2>
      
      {/* Gender Selection Title */}
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
      
      {/* Title Color */}
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
    

{/* Title Settings */}
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Title Font Size
  </label>
  <div>
    <label className="block text-xs text-gray-500 mb-1">
      Size: {genderButtonSettings.title_font_size || 24}px
    </label>
    <input
      type="range"
      min="16"
      max="100"
      step="1"
      value={genderButtonSettings.title_font_size || 24}
      onChange={(e) => handleChange("title_font_size", parseInt(e.target.value))}
      className="w-full"
    />
  </div>
</div>

{/* Title Color */}

      {/* Button Layout Setting */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Button Layout
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="row"
              checked={genderButtonSettings.button_layout === 'row'}
              onChange={(e) => handleChange("button_layout", e.target.value)}
              className="form-radio h-4 w-4 text-violet-600"
            />
            <span className="ml-2">Side by Side</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="column"
              checked={genderButtonSettings.button_layout === 'column'}
              onChange={(e) => handleChange("button_layout", e.target.value)}
              className="form-radio h-4 w-4 text-violet-600"
            />
            <span className="ml-2">Stacked</span>
          </label>
        </div>
      </div>
      
      {/* Button Size Adjustment */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Button Size
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Width: {genderButtonSettings.gender_button_width || 250}px
            </label>
            <input
              type="range"
              min="100"
              max="500"
              step="10"
              value={genderButtonSettings.gender_button_width || 250}
              onChange={(e) => handleChange("gender_button_width", parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Height: {genderButtonSettings.gender_button_height || 250}px
            </label>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={genderButtonSettings.gender_button_height || 250}
              onChange={(e) => handleChange("gender_button_height", parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      {/* Male Button Background */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Male Button Background
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={settings.male_button_background || ""}
            onChange={(e) => handleChange("male_button_background", e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="URL to male button background"
          />
          <button
            type="button"
            className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={() => document.getElementById('male_bg_upload').click()}
          >
            Upload
          </button>
          <input
            id="male_bg_upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "male_button_background")}
          />
        </div>
        {settings.male_button_background && (
          <div className="mt-2">
            <img
              src={settings.male_button_background}
              alt="Male Button Preview"
              className="max-w-full h-32 object-cover rounded"
            />
          </div>
        )}
      </div>
      
      {/* Female Button Background */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Female Button Background
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={settings.female_button_background || ""}
            onChange={(e) => handleChange("female_button_background", e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="URL to female button background"
          />
          <button
            type="button"
            className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={() => document.getElementById('female_bg_upload').click()}
          >
            Upload
          </button>
          <input
            id="female_bg_upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "female_button_background")}
          />
        </div>
        {settings.female_button_background && (
          <div className="mt-2">
            <img
              src={settings.female_button_background}
              alt="Female Button Preview"
              className="max-w-full h-32 object-cover rounded"
            />
          </div>
        )}
      </div>
      
      {/* Save Button */}
   
      
      // Update the Save Button section
      {showSaveButton && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
          >
            Save Gender Settings
          </button>
        </div>
      )}
    </div>
  );
}

export default GenderPageSettings;