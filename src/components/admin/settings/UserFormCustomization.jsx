
function UserFormCustomization({ settings, handleInputChange, setSettings }) {
  // Add setSettings to the props
  return (
    <div className="mb-8 border-b pb-6">
      <h2 className="text-xl font-semibold mb-4">User Form Customization</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2">Form Title</label>
          <input
            type="text"
            name="form_title"
            value={settings.form_title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Button Text</label>
          <input
            type="text"
            name="button_text"
            value={settings.button_text}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Form Position</label>
          <select
            name="form_position"
            value={settings.form_position}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="top">Top</option>
            <option value="middle">Middle</option>
            <option value="bottom">Bottom</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        
        {settings.form_position === "custom" && (
          <div>
            <label className="block text-gray-700 mb-2">Position Percentage (from top)</label>
            <input
              type="number"
              name="form_position_percent"
              value={settings.form_position_percent}
              onChange={handleInputChange}
              min="0"
              max="100"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="enable_data_collection"
            name="enable_data_collection"
            checked={settings.enable_data_collection}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label htmlFor="enable_data_collection" className="text-gray-700">
            Enable Data Collection
          </label>
        </div>
        <p className="text-sm text-gray-500">
          When enabled, users will be prompted to enter their information before using the photobooth.
        </p>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="require_name"
            name="require_name"
            checked={settings.require_name}
            onChange={handleInputChange}
            disabled={!settings.enable_data_collection}
            className="mr-2"
          />
          <label htmlFor="require_name" className="text-gray-700">
            Require Name
          </label>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="enable_email_collection"
            name="enable_email_collection"
            checked={settings.enable_email_collection}
            onChange={handleInputChange}
            disabled={!settings.enable_data_collection}
            className="mr-2"
          />
          <label htmlFor="enable_email_collection" className="text-gray-700">
            Collect Email Addresses
          </label>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-medium mb-2">Form Label Styling</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
        <div>
            <label className="block text-gray-700 mb-2">Label Font Size (px)</label>
            <input
              type="number"
              min="10"
              max="36"
              name="label_font_size"
              value={parseInt((settings.form_style?.labelFontSize || '16px').replace('px', ''))}
              onChange={(e) => {
                setSettings({
                  ...settings,
                  form_style: {
                    ...(settings.form_style || {}),
                    labelFontSize: `${e.target.value}px`
                  }
                });
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
        
          <div>
            <label className="block text-gray-700 mb-2">Label Font Weight</label>
            <select
              name="label_font_weight"
              value={settings.form_style?.labelFontWeight || "normal"}
              onChange={(e) => {
                setSettings({
                  ...settings,
                  form_style: {
                    ...(settings.form_style || {}),
                    labelFontWeight: e.target.value
                  }
                });
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="normal">Normal</option>
              <option value="500">Medium</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Label Font Style</label>
            <select
              name="label_font_style"
              value={settings.form_style?.labelFontStyle || "normal"}
              onChange={(e) => {
                setSettings({
                  ...settings,
                  form_style: {
                    ...(settings.form_style || {}), // Add null coalescing here
                    labelFontStyle: e.target.value
                  }
                });
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="normal">Normal</option>
              <option value="italic">Italic</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Label Color</label>
            <input
              type="color"
              name="label_color"
              value={settings.form_style?.labelColor || "#000000"}
              onChange={(e) => {
                setSettings({
                  ...settings,
                  form_style: {
                    ...settings.form_style,
                    labelColor: e.target.value
                  }
                });
              }}
              className="w-full p-1 border border-gray-300 rounded-md h-10"
            />
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default UserFormCustomization;