import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

function ScenePageSettings({ setMessage }) {
  const [sceneSettings, setSceneSettings] = useState({
    scene_page_title: 'Select your scene',
    title_color: '#000000',
    title_font_size: 48,
    scene_card_width: 450,
    scene_card_height: 750,
    button_text_color: '#FFFFFF',
    button_bg_color: '#7C3AED',
    button_hover_color: '#6D28D9',
    show_scene_name: true
  });

  useEffect(() => {
    const fetchSceneSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('scene_page_settings')
          .select('*')
          .single();
        
        if (error) throw error;
        
        if (data) {
          setSceneSettings(data);
        }
      } catch (error) {
        console.error('Error fetching scene settings:', error);
        setMessage({ text: 'Failed to load scene settings', type: 'error' });
      }
    };
    
    fetchSceneSettings();
  }, [setMessage]);

  // Add this to your ScenePageSettings component
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : type === 'number' ? parseInt(value, 10) : value;
    
    const updatedSettings = {
      ...sceneSettings,
      [name]: newValue
    };
    
    setSceneSettings(updatedSettings);
    
    // Dispatch an event for live preview updates
    window.dispatchEvent(new CustomEvent('sceneSettingsUpdated', {
      detail: { settings: updatedSettings }
    }));
  };

  const handleSaveSceneSettings = async () => {
    try {
      setMessage({ text: 'Saving scene settings...', type: 'info' });
      
      const { error } = await supabase
        .from('scene_page_settings')
        .update(sceneSettings)
        .eq('id', 1);
      
      if (error) throw error;
      
      // Dispatch an event to notify other components about the update
      window.dispatchEvent(new CustomEvent('sceneSettingsUpdated', {
        detail: { settings: sceneSettings }
      }));
      
      setMessage({ text: 'Scene settings saved successfully!', type: 'success' });
    } catch (error) {
      console.error('Error saving scene settings:', error);
      setMessage({ text: `Error saving scene settings: ${error.message}`, type: 'error' });
    }
  };

  return (
    <div className="mb-8 border-b pb-6">
      <h2 className="text-xl font-semibold mb-4">Scene Selection Page Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Page Title
          </label>
          <input
            type="text"
            name="scene_page_title"
            value={sceneSettings.scene_page_title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title Color
          </label>
          <div className="flex">
            <input
              type="color"
              name="title_color"
              value={sceneSettings.title_color}
              onChange={handleInputChange}
              className="h-10 w-10 border rounded-md"
            />
            <input
              type="text"
              value={sceneSettings.title_color}
              onChange={handleInputChange}
              name="title_color"
              className="ml-2 w-full p-2 border rounded-md"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title Font Size (px)
          </label>
          <input
            type="number"
            name="title_font_size"
            value={sceneSettings.title_font_size}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            min="12"
            max="72"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Scene Card Width (px)
          </label>
          <input
            type="number"
            name="scene_card_width"
            value={sceneSettings.scene_card_width}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            min="200"
            max="800"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Scene Card Height (px)
          </label>
          <input
            type="number"
            name="scene_card_height"
            value={sceneSettings.scene_card_height}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            min="300"
            max="1000"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Button Text Color
          </label>
          <div className="flex">
            <input
              type="color"
              name="button_text_color"
              value={sceneSettings.button_text_color}
              onChange={handleInputChange}
              className="h-10 w-10 border rounded-md"
            />
            <input
              type="text"
              value={sceneSettings.button_text_color}
              onChange={handleInputChange}
              name="button_text_color"
              className="ml-2 w-full p-2 border rounded-md"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Button Background Color
          </label>
          <div className="flex">
            <input
              type="color"
              name="button_bg_color"
              value={sceneSettings.button_bg_color}
              onChange={handleInputChange}
              className="h-10 w-10 border rounded-md"
            />
            <input
              type="text"
              value={sceneSettings.button_bg_color}
              onChange={handleInputChange}
              name="button_bg_color"
              className="ml-2 w-full p-2 border rounded-md"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Button Hover Color
          </label>
          <div className="flex">
            <input
              type="color"
              name="button_hover_color"
              value={sceneSettings.button_hover_color}
              onChange={handleInputChange}
              className="h-10 w-10 border rounded-md"
            />
            <input
              type="text"
              value={sceneSettings.button_hover_color}
              onChange={handleInputChange}
              name="button_hover_color"
              className="ml-2 w-full p-2 border rounded-md"
            />
          </div>
        </div>
        
        <div className="mb-4 col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="show_scene_name"
              checked={sceneSettings.show_scene_name}
              onChange={handleInputChange}
              className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Show Scene Name</span>
          </label>
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleSaveSceneSettings}
          className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
        >
          Save Scene Settings
        </button>
      </div>
    </div>
  );
}

export default ScenePageSettings;