
function StartPageSettings({ settings, setSettings }) {
  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Start Page Settings</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start Page Title Style
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Font Size (rem)</label>
            <input
              type="text"
              value={settings.start_title_font_size || "2.5"}
              onChange={(e) => handleChange("start_title_font_size", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="2.5"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Font Weight</label>
            <select
              value={settings.start_title_font_weight || "bold"}
              onChange={(e) => handleChange("start_title_font_weight", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="normal">Normal</option>
              <option value="medium">Medium</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Text Color</label>
            <input
              type="color"
              value={settings.start_title_color || "#000000"}
              onChange={(e) => handleChange("start_title_color", e.target.value)}
              className="w-full p-1 h-10 border rounded"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Margin Bottom</label>
            <input
              type="text"
              value={settings.start_title_margin_bottom || "6"}
              onChange={(e) => handleChange("start_title_margin_bottom", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="6"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start Page Message Style
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Font Size (rem)</label>
            <input
              type="text"
              value={settings.start_message_font_size || "1.25"}
              onChange={(e) => handleChange("start_message_font_size", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="1.25"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Text Color</label>
            <input
              type="color"
              value={settings.start_message_color || "#000000"}
              onChange={(e) => handleChange("start_message_color", e.target.value)}
              className="w-full p-1 h-10 border rounded"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Margin Bottom</label>
            <input
              type="text"
              value={settings.start_message_margin_bottom || "8"}
              onChange={(e) => handleChange("start_message_margin_bottom", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="8"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start Button Style
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Button Text</label>
            <input
              type="text"
              value={settings.start_button_text || "Start"}
              onChange={(e) => handleChange("start_button_text", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Start"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Text Color</label>
            <input
              type="color"
              value={settings.start_button_text_color || "#FFFFFF"}
              onChange={(e) => handleChange("start_button_text_color", e.target.value)}
              className="w-full p-1 h-10 border rounded"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Font Size (rem)</label>
            <input
              type="text"
              value={settings.start_button_font_size || "1.25"}
              onChange={(e) => handleChange("start_button_font_size", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="1.25"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Button Width (px)</label>
            <input
              type="text"
              value={settings.start_button_width || "312"}
              onChange={(e) => handleChange("start_button_width", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="312"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Button Height (px)</label>
            <input
              type="text"
              value={settings.start_button_height || "86"}
              onChange={(e) => handleChange("start_button_height", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="86"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Position</label>
            <select
              value={settings.start_button_position || "center"}
              onChange={(e) => handleChange("start_button_position", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="top">Top</option>
              <option value="center">Center</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Position Offset (px)</label>
            <input
              type="number"
              value={settings.start_button_position_offset || "0"}
              onChange={(e) => handleChange("start_button_position_offset", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Background Color</label>
            <input
              type="color"
              value={settings.start_button_bg_color || "#8b5cf6"}
              onChange={(e) => handleChange("start_button_bg_color", e.target.value)}
              className="w-full p-1 h-10 border rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartPageSettings;