
function FormStyling({ settings, setSettings }) {
  return (
    <div className="mb-6 bg-gray-50 p-4 rounded-md">
      <h3 className="font-medium mb-3">Form Styling</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2">Background Color</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              name="form_background_color"
              value={settings.form_style?.backgroundColor || "#ffffff"}
              onChange={(e) => {
                setSettings({
                  ...settings,
                  form_style: {
                    ...settings.form_style,
                    backgroundColor: e.target.value,
                    isTransparent: false
                  }
                });
              }}
              className="w-full p-1 border border-gray-300 rounded-md h-10"
              disabled={settings.form_style?.isTransparent}
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="transparent_background"
            checked={settings.form_style?.isTransparent || false}
            onChange={(e) => {
              setSettings({
                ...settings,
                form_style: {
                  ...settings.form_style,
                  isTransparent: e.target.checked,
                  backgroundColor: e.target.checked ? 'transparent' : (settings.form_style?.backgroundColor || '#ffffff')
                }
              });
            }}
            className="mr-2"
          />
          <label htmlFor="transparent_background" className="text-gray-700">
            Transparent Background
          </label>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Form Text Color</label>
          <input
            type="color"
            name="form_text_color"
            value={settings.form_style?.color || "#000000"}
            onChange={(e) => {
              setSettings({
                ...settings,
                form_style: {
                  ...settings.form_style,
                  color: e.target.value,
                  textColor: e.target.value // Adding this as an alternative property name
                }
              });
            }}
            className="w-full p-1 border border-gray-300 rounded-md h-10"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Border Radius (px)</label>
          <input
            type="number"
            min="0"
            max="50"
            name="form_border_radius"
            value={parseInt(settings.form_style?.borderRadius) || 8}
            onChange={(e) => {
              setSettings({
                ...settings,
                form_style: {
                  ...settings.form_style,
                  borderRadius: `${e.target.value}px`
                }
              });
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Border Color</label>
          <input
            type="color"
            name="form_border_color"
            value={settings.form_style?.borderColor || "#cccccc"}
            onChange={(e) => {
              setSettings({
                ...settings,
                form_style: {
                  ...settings.form_style,
                  borderColor: e.target.value
                }
              });
            }}
            className="w-full p-1 border border-gray-300 rounded-md h-10"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Border Width (px)</label>
          <input
            type="number"
            min="0"
            max="10"
            name="form_border_width"
            value={parseInt(settings.form_style?.borderWidth) || 1}
            onChange={(e) => {
              setSettings({
                ...settings,
                form_style: {
                  ...settings.form_style,
                  borderWidth: `${e.target.value}px`,
                  borderStyle: e.target.value > 0 ? 'solid' : 'none'
                }
              });
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      <h4 className="font-medium mb-2 mt-4">Input Field Styling</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2">Input Background Color</label>
          <input
            type="color"
            name="input_background_color"
            value={settings.form_style?.inputBackgroundColor || "#ffffff"}
            onChange={(e) => {
              setSettings({
                ...settings,
                form_style: {
                  ...settings.form_style,
                  inputBackgroundColor: e.target.value
                }
              });
            }}
            className="w-full p-1 border border-gray-300 rounded-md h-10"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Input Text Color</label>
          <input
            type="color"
            name="input_text_color"
            value={settings.form_style?.inputTextColor || "#000000"}
            onChange={(e) => {
              setSettings({
                ...settings,
                form_style: {
                  ...settings.form_style,
                  inputTextColor: e.target.value,
                  inputColor: e.target.value // Adding this as an alternative property name
                }
              });
            }}
            className="w-full p-1 border border-gray-300 rounded-md h-10"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Input Border Color</label>
          <input
            type="color"
            name="input_border_color"
            value={settings.form_style?.inputBorderColor || "#cccccc"}
            onChange={(e) => {
              setSettings({
                ...settings,
                form_style: {
                  ...settings.form_style,
                  inputBorderColor: e.target.value
                }
              });
            }}
            className="w-full p-1 border border-gray-300 rounded-md h-10"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Input Border Thickness (px)</label>
          <input
            type="number"
            min="0"
            max="5"
            name="input_border_width"
            value={parseInt(settings.form_style?.inputBorderWidth) || 1}
            onChange={(e) => {
              setSettings({
                ...settings,
                form_style: {
                  ...settings.form_style,
                  inputBorderWidth: `${e.target.value}px`
                }
              });
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Input Border Radius (px)</label>
          <input
            type="number"
            min="0"
            max="20"
            name="input_border_radius"
            value={parseInt(settings.form_style?.inputBorderRadius) || 4}
            onChange={(e) => {
              setSettings({
                ...settings,
                form_style: {
                  ...settings.form_style,
                  inputBorderRadius: `${e.target.value}px`
                }
              });
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
      
        <div>
          <label className="block text-gray-700 mb-2">Input Height (px)</label>
          <input
            type="number"
            min="30"
            max="100"
            name="input_height"
            value={parseInt(settings.form_style?.inputHeight) || 40}
            onChange={(e) => {
              setSettings({
                ...settings,
                form_style: {
                  ...(settings.form_style || {}),
                  inputHeight: `${e.target.value}px`
                }
              });
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Input Padding (px)</label>
          <input
            type="number"
            min="0"
            max="20"
            name="input_padding"
            value={parseInt(settings.form_style?.inputPadding) || 8}
            onChange={(e) => {
              setSettings({
                ...settings,
                form_style: {
                  ...(settings.form_style || {}),
                  inputPadding: `${e.target.value}px`
                }
              });
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Input Font Size (px)</label>
          <input
            type="number"
            min="10"
            max="24"
            name="input_font_size"
            value={parseInt(settings.form_style?.inputFontSize) || 16}
            onChange={(e) => {
              setSettings({
                ...settings,
                form_style: {
                  ...(settings.form_style || {}),
                  inputFontSize: `${e.target.value}px`
                }
              });
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Button Top Margin (px)</label>
          <input
            type="number"
            min="0"
            max="100"
            name="button_top_margin"
            value={parseInt(settings.form_style?.buttonTopMargin) || 20}
            onChange={(e) => {
              setSettings({
                ...settings,
                form_style: {
                  ...(settings.form_style || {}),
                  buttonTopMargin: `${e.target.value}px`
                }
              });
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default FormStyling;