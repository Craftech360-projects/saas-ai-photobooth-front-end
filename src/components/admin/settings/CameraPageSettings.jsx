import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

function CameraPageSettings({ setMessage }) {
  const [settings, setSettings] = useState({
    header_text: "Smile for the camera!",
    header_color: "#FFFFFF",
    header_font_size: 24,
    button_color: "#8b5cf6",
    overlay_image: "",
  });
  // In the handleSave function, update the event dispatch:
  // In the handleSave function, update to specify the correct table and fields
  const handleSave = async () => {
    try {
      // Create a clean object with only the fields that exist in the camera_page_settings table
      const cleanSettings = {
  
        header_text: settings.header_text,
        header_color: settings.header_color,
        header_font_size: settings.header_font_size,
        button_color: settings.button_color,
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
  // In the fetchSettings function, update to handle empty table
  // In the useEffect fetchSettings function, update the state fields:
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

  // In the return statement JSX, update the input values:
  return (
    <div className="space-y-4">
      <div>
        <label>Header Text</label>
        <input
          type="text"
          value={settings?.header_text || "Smile for the camera!"}
          onChange={(e) => setSettings({...settings, header_text: e.target.value})}
        />
      </div>
      
      <div>
        <label>Header Color</label>
        <input
          type="color"
          value={settings?.header_color || "#FFFFFF"}
          onChange={(e) => setSettings({...settings, header_color: e.target.value})}
        />
      </div>
      
      <div>
        <label>Button Color</label>
        <input
          type="color"
          value={settings?.button_color || "#8b5cf6"}
          onChange={(e) => setSettings({...settings, button_color: e.target.value})}
        />
      </div>
      
      <button 
        onClick={handleSave}
        className="bg-violet-600 text-white px-4 py-2 rounded"
      >
        Save Camera Settings
      </button>
    </div>
  );
} // <-- Add missing component closing brace

export default CameraPageSettings;