import React from "react";

function GeneralSettings({ settings, handleInputChange }) {
  return (
    <div className="mb-8 border-b pb-6">
      <h2 className="text-xl font-semibold mb-4">General Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Application Title</label>
          <input
            type="text"
            name="app_title"
            value={settings.app_title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Welcome Message</label>
          <input
            type="text"
            name="welcome_message"
            value={settings.welcome_message}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralSettings;