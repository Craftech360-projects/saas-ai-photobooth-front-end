import React from "react";

function ButtonStyling({ settings, setSettings, buttonType }) {
  return (
    <div className="mt-4">
      <h4 className="font-medium mb-2">Button Styling</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2">Button Width (px)</label>
          <input
            type="number"
            min="100"
            max="500"
            name="button_width"
            value={parseInt(settings.button_style?.width) || 312}
            onChange={(e) => {
              setSettings({
                ...settings,
                button_style: {
                  ...settings.button_style,
                  width: `${e.target.value}px`
                }
              });
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Button Height (px)</label>
          <input
            type="number"
            min="30"
            max="200"
            name="button_height"
            value={parseInt(settings.button_style?.height) || 86}
            onChange={(e) => {
              setSettings({
                ...settings,
                button_style: {
                  ...settings.button_style,
                  height: `${e.target.value}px`
                }
              });
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Button Text Color</label>
          <input
            type="color"
            name="button_text_color"
            value={settings.button_style?.color || "#ffffff"}
            onChange={(e) => {
              setSettings({
                ...settings,
                button_style: {
                  ...settings.button_style,
                  color: e.target.value
                }
              });
            }}
            className="w-full p-1 border border-gray-300 rounded-md h-10"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Button Background Color</label>
          <input
            type="color"
            name="button_background_color"
            value={settings.button_style?.backgroundColor || "#8b5cf6"}
            onChange={(e) => {
              setSettings({
                ...settings,
                button_style: {
                  ...settings.button_style,
                  backgroundColor: e.target.value
                }
              });
            }}
            className="w-full p-1 border border-gray-300 rounded-md h-10"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Button Border Radius (px)</label>
          <input
            type="number"
            min="0"
            max="50"
            name="button_border_radius"
            value={parseInt(settings.button_style?.borderRadius) || 8}
            onChange={(e) => {
              setSettings({
                ...settings,
                button_style: {
                  ...settings.button_style,
                  borderRadius: `${e.target.value}px`
                }
              });
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Button Font Size (px)</label>
          <input
            type="number"
            min="10"
            max="36"
            name="button_font_size"
            value={parseInt(settings.button_style?.fontSize) || 16}
            onChange={(e) => {
              setSettings({
                ...settings,
                button_style: {
                  ...settings.button_style,
                  fontSize: `${e.target.value}px`
                }
              });
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Button Position</label>
          <select
            name="button_position"
            value={settings.button_style?.alignSelf || "center"}
            onChange={(e) => {
              setSettings({
                ...settings,
                button_style: {
                  ...settings.button_style,
                  alignSelf: e.target.value,
                  marginLeft: e.target.value === "flex-start" ? "0" : 
                             e.target.value === "flex-end" ? "auto" : "auto",
                  marginRight: e.target.value === "flex-end" ? "0" : 
                              e.target.value === "flex-start" ? "auto" : "auto"
                }
              });
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="flex-start">Left</option>
            <option value="center">Center</option>
            <option value="flex-end">Right</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Button Text Weight</label>
          <select
            name="button_text_weight"
            value={settings.button_style?.fontWeight || "normal"}
            onChange={(e) => {
              setSettings({
                ...settings,
                button_style: {
                  ...settings.button_style,
                  fontWeight: e.target.value
                }
              });
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="normal">Normal</option>
            <option value="500">Semi-Bold</option>
            <option value="bold">Bold</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Use Custom Button Background</label>
          <div className="flex items-center h-10">
            <input
              type="checkbox"
              id="use_custom_button_bg"
              checked={settings.button_style?.useCustomBackground || false}
              onChange={(e) => {
                setSettings({
                  ...settings,
                  button_style: {
                    ...settings.button_style,
                    useCustomBackground: e.target.checked
                  }
                });
              }}
              className="mr-2"
            />
            <label htmlFor="use_custom_button_bg" className="text-gray-700">
              Use uploaded background image
            </label>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-medium mb-2">Button Preview</h4>
        <div className="p-4 bg-gray-100 rounded-md flex justify-center">
          <button
            style={{
              width: settings.button_style?.width || '312px',
              height: settings.button_style?.height || '86px',
              backgroundColor: settings.button_style?.backgroundColor || '#8b5cf6',
              color: settings.button_style?.color || '#ffffff',
              borderRadius: settings.button_style?.borderRadius || '8px',
              fontSize: settings.button_style?.fontSize || '16px',
              fontWeight: settings.button_style?.fontWeight || 'normal',
              backgroundImage: settings.button_style?.useCustomBackground && 
                (buttonType === 'start' ? settings.start_button_background : settings.continue_button_background) ? 
                `url(${buttonType === 'start' ? settings.start_button_background : settings.continue_button_background})` : 'none',
              backgroundSize: '100% 100%', // Changed from 'cover' to ensure exact sizing
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0'
            }}
            className="shadow-md"
            type="button"
          >
            {settings.button_text || "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ButtonStyling;