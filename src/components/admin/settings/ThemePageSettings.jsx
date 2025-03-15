import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

function ThemePageSettings({ settings, setSettings, setMessage }) {
  const [themePageSettings, setThemePageSettings] = useState({
    theme_page_title: "Select your theme",
    title_color: "#000000",
    title_font_size: 48,
    theme_card_width: 450,
    theme_card_height: 750,
    button_text_color: "#FFFFFF",
    button_bg_color: "#7C3AED",
    button_hover_color: "#6D28D9",
    show_theme_name: true
  });

  // Add local state to track changes
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchThemePageSettings = async () => {
      const { data, error } = await supabase
        .from('theme_page_settings')
        .select('*')
        .single();

      if (data) {
        setThemePageSettings(data);
      }
    };

    fetchThemePageSettings();
  }, []);

  // Modify handleChange to update local state without immediate save
  const handleChange = (field, value) => {
    setThemePageSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);

    // Dispatch event for preview update
    const event = new CustomEvent('themeSettingsUpdated', {
      detail: { 
        settings: {
          ...themePageSettings,
          [field]: value
        }
      }
    });
    window.dispatchEvent(event);
  };

  // Add save function
  const handleSave = async () => {
    try {
      setMessage({ text: "Saving theme page settings...", type: "info" });
      
      const { error } = await supabase
        .from('theme_page_settings')
        .upsert({ 
          id: 1, // Use a fixed ID for single record
          ...themePageSettings 
        });

      if (error) throw error;
      
      setMessage({ text: "Theme page settings saved successfully!", type: "success" });
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving theme page settings:", error);
      setMessage({ text: "Failed to save theme page settings.", type: "error" });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-red-600">Theme Selection Page Settings</h2>
        
      </div>

      {/* Title Settings */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Page Title
        </label>
        <input
          type="text"
          value={themePageSettings.theme_page_title}
          onChange={(e) => handleChange("theme_page_title", e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Title Color */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title Color
        </label>
        <input
          type="color"
          value={themePageSettings.title_color}
          onChange={(e) => handleChange("title_color", e.target.value)}
          className="w-full p-1 h-10 border rounded"
        />
      </div>

      {/* Title Font Size */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title Font Size
        </label>
        <div>
          <span className="text-sm text-gray-500">{themePageSettings.title_font_size}px</span>
          <input
            type="range"
            min="24"
            max="72"
            value={themePageSettings.title_font_size}
            onChange={(e) => handleChange("title_font_size", parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Theme Card Size */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Theme Card Size
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Width: {themePageSettings.theme_card_width}px</span>
            <input
              type="range"
              min="50"
              max="600"
              value={themePageSettings.theme_card_width}
              onChange={(e) => handleChange("theme_card_width", parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <span className="text-sm text-gray-500">Height: {themePageSettings.theme_card_height}px</span>
            <input
              type="range"
              min="50"
              max="900"
              value={themePageSettings.theme_card_height}
              onChange={(e) => handleChange("theme_card_height", parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Button Colors */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Button Colors
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Background</span>
            <input
              type="color"
              value={themePageSettings.button_bg_color}
              onChange={(e) => handleChange("button_bg_color", e.target.value)}
              className="w-full p-1 h-10 border rounded"
            />
          </div>
          <div>
            <span className="text-sm text-gray-500">Text</span>
            <input
              type="color"
              value={themePageSettings.button_text_color}
              onChange={(e) => handleChange("button_text_color", e.target.value)}
              className="w-full p-1 h-10 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Show Theme Name Toggle */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={themePageSettings.show_theme_name}
            onChange={(e) => handleChange("show_theme_name", e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700">Show Theme Names</span>
        </label>
      </div>
      {/* Add save button at the bottom as well */}
      {hasChanges && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default ThemePageSettings;