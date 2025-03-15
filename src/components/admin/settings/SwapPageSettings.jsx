import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

function SwapPageSettings({ setMessage }) {
  const [settings, setSettings] = useState({
    title_text: "Scan the QR code to download your AI avatar",
    title_color: "#FFFFFF",
    title_font_size: 24,
    button_color: "#8b5cf6",
    qr_border_color: "#e11d48",
    background_image: "",
    image_width: 40,
    show_print_button: true
  });

  const handleSave = async () => {
    try {
      const cleanSettings = {
        id: settings.id,
        title_text: settings.title_text,
        title_color: settings.title_color,
        title_font_size: settings.title_font_size,
        button_color: settings.button_color,
        qr_border_color: settings.qr_border_color,
        background_image: settings.background_image,
        image_width: settings.image_width,
        show_print_button: settings.show_print_button
      };

      const { data, error } = await supabase
        .from('swap_page_settings')
        .upsert(cleanSettings)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      
      setSettings(data);
      
      window.dispatchEvent(new CustomEvent('swapSettingsUpdated', { 
        detail: { settings: data } 
      }));
      
      setMessage({ type: 'success', text: 'Swap page settings saved!' });
    } catch (error) {
      console.error('Save error:', error);
      setMessage({ type: 'error', text: error.message });
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      let { data, error } = await supabase
        .from('swap_page_settings')
        .select('*')
        .order('id', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (data) {
        setSettings({
          id: data.id,
          title_text: data.title_text,
          title_color: data.title_color,
          title_font_size: data.title_font_size,
          button_color: data.button_color,
          qr_border_color: data.qr_border_color,
          background_image: data.background_image,
          image_width: data.image_width || 40,
          show_print_button: data.show_print_button !== false
        });
      } else {
        // If no data exists, create a default entry
        const { data: newData, error: insertError } = await supabase
          .from('swap_page_settings')
          .insert([{
            title_text: "Scan the QR code to download your AI avatar",
            title_color: "#FFFFFF",
            title_font_size: 24,
            button_color: "#8b5cf6",
            qr_border_color: "#e11d48",
            background_image: "",
            image_width: 40,
            show_print_button: true
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
        <h2 className="text-xl font-bold mb-4">Result Page Settings</h2>
        <label className="block mb-1">Title Text</label>
        <input
          type="text"
          value={settings?.title_text || "Scan the QR code to download your AI avatar"}
          onChange={(e) => setSettings({...settings, title_text: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div>
        <label className="block mb-1">Title Color</label>
        <input
          type="color"
          value={settings?.title_color || "#FFFFFF"}
          onChange={(e) => setSettings({...settings, title_color: e.target.value})}
          className="w-1/4 border rounded"
        />
      </div>
      
      <div>
        <label className="block mb-1">Title Font Size (px)</label>
        <input
          type="number"
          value={settings?.title_font_size || 24}
          onChange={(e) => setSettings({...settings, title_font_size: parseInt(e.target.value)})}
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
      
      <div>
        <label className="block mb-1">QR Border Color</label>
        <input
          type="color"
          value={settings?.qr_border_color || "#e11d48"}
          onChange={(e) => setSettings({...settings, qr_border_color: e.target.value})}
          className="w-1/4 border rounded"
        />
      </div>
      
      <div>
        <label className="block mb-1">Background Image URL</label>
        <input
          type="text"
          value={settings?.background_image || ""}
          onChange={(e) => setSettings({...settings, background_image: e.target.value})}
          className="w-full p-2 border rounded"
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <div>
        <label className="block mb-1">Image Width (%)</label>
        <input
          type="range"
          min="20"
          max="60"
          value={settings?.image_width || 40}
          onChange={(e) => setSettings({...settings, image_width: parseInt(e.target.value)})}
          className="w-full"
        />
        <div className="text-sm text-gray-500">{settings?.image_width || 40}%</div>
      </div>
      
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="show_print_button"
          checked={settings?.show_print_button !== false}
          onChange={(e) => setSettings({...settings, show_print_button: e.target.checked})}
          className="mr-2"
        />
        <label htmlFor="show_print_button">Show Print Button</label>
      </div>
      
      <button 
        onClick={handleSave}
        className="bg-violet-600 text-white px-4 py-2 rounded mt-4"
      >
        Save Swap Page Settings
      </button>
    </div>
  );
}

export default SwapPageSettings;