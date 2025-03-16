import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

function CameraPageSettings({ setMessage }) {
  const [settings, setSettings] = useState({
    header_text: "Smile for the camera!",
    header_color: "#FFFFFF",
    header_font_size: 24,
    button_color: "#8b5cf6",
    button_text_color: "#FFFFFF", // Added button text color
    button_roundness: "rounded-3xl", // Added button roundness
    overlay_image: "",
  });
  
  const handleSave = async () => {
    try {
      // Create a clean object with only the fields that exist in the camera_page_settings table
      const cleanSettings = {
        id: settings.id, // Include the ID for proper upsert
        header_text: settings.header_text,
        header_color: settings.header_color,
        header_font_size: settings.header_font_size,
        button_color: settings.button_color,
        button_text_color: settings.button_text_color,
        button_roundness: settings.button_roundness,
        overlay_image: settings.overlay_image
      };
  
      const { data, error } = await supabase
        .from('camera_page_settings')
        .upsert(cleanSettings)
        .select()
        .single();
  
      if (error) {
        throw new Error(error.message);
      }
      
      // Update local state with the latest data from DB
      setSettings(data);
      
      // Dispatch event with updated data
      window.dispatchEvent(new CustomEvent('cameraSettingsUpdated', { 
        detail: { settings: data } 
      }));
      
      setMessage({ type: 'success', text: 'Camera settings saved!' });
    } catch (error) {
      console.error('Save error:', error);
      setMessage({ type: 'error', text: error.message });
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      let { data, error } = await supabase
        .from('camera_page_settings')
        .select('*')
        .order('id', { ascending: true })
        .limit(1)
        .maybeSingle();
  
      if (data) {
        setSettings({
          id: data.id, // Make sure to include the ID
          header_text: data.header_text,
          header_color: data.header_color,
          header_font_size: data.header_font_size,
          button_color: data.button_color,
          button_text_color: data.button_text_color || "#FFFFFF", // Added with default
          button_roundness: data.button_roundness || "rounded-3xl", // Added with default
          overlay_image: data.overlay_image
        });
      } else {
        // If no data exists, create a default entry
        const { data: newData, error: insertError } = await supabase
          .from('camera_page_settings')
          .insert([{
            header_text: "Smile for the camera!",
            header_color: "#FFFFFF",
            header_font_size: 24,
            button_color: "#8b5cf6",
            button_text_color: "#FFFFFF", // Added default value
            button_roundness: "rounded-3xl", // Added default value
            overlay_image: ""
          }])
          .select()
          .single();
          
        if (newData) {
          setSettings(newData);
        }
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="space-y-4 mb-8 border-b pb-6">
      <div>
        <label className="block mb-1">Header Text</label>
        <input
          type="text"
          value={settings?.header_text || "Smile for the camera!"}
          onChange={(e) => setSettings({...settings, header_text: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div>
        <label className="block mb-1">Header Color</label>
        <input
          type="color"
          value={settings?.header_color || "#FFFFFF"}
          onChange={(e) => setSettings({...settings, header_color: e.target.value})}
          className="w-1/4 border rounded"
        />
      </div>
      
      <div>
        <label className="block mb-1">Header Font Size (px)</label>
        <input
          type="number"
          value={settings?.header_font_size || 24}
          onChange={(e) => setSettings({...settings, header_font_size: parseInt(e.target.value)})}
          className="w-1/4 border rounded"
        />
      </div>
      
      <div>
        <label className="block mb-1">Button Color</label>
        <input
          type="color"
          value={settings?.button_color || "#8b5cf6"}
          onChange={(e) => setSettings({...settings, button_color: e.target.value})}
          className="w-1/4 border rounded"
        />
      </div>
      
      {/* Add Button Text Color option */}
      <div>
        <label className="block mb-1">Button Text Color</label>
        <input
          type="color"
          value={settings?.button_text_color || "#FFFFFF"}
          onChange={(e) => setSettings({...settings, button_text_color: e.target.value})}
          className="w-1/4 border rounded"
        />
      </div>
      
      {/* Add Button Roundness option */}
      <div>
        <label className="block mb-1">Button Corner Roundness</label>
        <select
          value={settings?.button_roundness || "rounded-3xl"}
          onChange={(e) => setSettings({...settings, button_roundness: e.target.value})}
          className="w-full p-2 border rounded"
        >
          <option value="rounded-none">None</option>
          <option value="rounded">Small</option>
          <option value="rounded-md">Medium</option>
          <option value="rounded-lg">Large</option>
          <option value="rounded-xl">Extra Large</option>
          <option value="rounded-2xl">2XL</option>
          <option value="rounded-3xl">3XL (Default)</option>
          <option value="rounded-full">Full (Pill Shape)</option>
        </select>
      </div>
      
      <button 
        onClick={handleSave}
        className="bg-violet-600 text-white px-4 py-2 rounded mt-4"
      >
        Save Camera Settings
      </button>
    </div>
  );
}

export default CameraPageSettings;