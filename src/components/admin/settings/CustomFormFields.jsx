import ButtonStyling from "./ButtonStyling";
import FormStyling from "./FormStyling";

function CustomFormFields({ 
  settings, 
  setSettings, 
  newCustomField, 
  setNewCustomField, 
  handleCustomFieldChange, 
  addCustomField, 
  removeCustomField,
  buttonType
}) {
  // Ensure settings and custom_form_fields exist with default values
  const customFields = settings?.custom_form_fields || [];
  
  return (
    <div className="mb-8 border-b pb-6">
      <h2 className="text-xl font-semibold mb-4">Custom Form Fields</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-4">
          Add custom fields to collect additional information from users.
        </p>
        
        <FormStyling settings={settings} setSettings={setSettings} />
        <ButtonStyling settings={settings} setSettings={setSettings} buttonType={buttonType} />
        
        {customFields.length > 0 ? (
          <div className="mb-4 mt-6">
            <h3 className="font-medium mb-2">Current Custom Fields</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              {customFields.map((field, index) => (
                <div key={index} className="flex justify-between items-center mb-2 p-2 border-b">
                  <div>
                    <span className="font-medium">{field.label}</span>
                    <span className="text-sm text-gray-500 ml-2">({field.type})</span>
                    {field.required && <span className="text-red-500 ml-2">*</span>}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCustomField(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 italic mb-4 mt-6">No custom fields added yet.</div>
        )}
        
        <div className="bg-gray-50 p-4 rounded-md mt-4">
          <h3 className="font-medium mb-3">Add New Field</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Field Name (ID)</label>
              <input
                type="text"
                name="name"
                value={newCustomField?.name || ""}
                onChange={handleCustomFieldChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g. company_name"
              />
              <p className="text-xs text-gray-500 mt-1">
                Unique identifier for the field (no spaces)
              </p>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Field Label</label>
              <input
                type="text"
                name="label"
                value={newCustomField?.label || ""}
                onChange={handleCustomFieldChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g. Company Name"
              />
              <p className="text-xs text-gray-500 mt-1">
                Label displayed to users
              </p>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Field Type</label>
              <select
                name="type"
                value={newCustomField?.type || "text"}
                onChange={handleCustomFieldChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="tel">Phone</option>
                <option value="number">Number</option>
                <option value="select">Dropdown</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Placeholder</label>
              <input
                type="text"
                name="placeholder"
                value={newCustomField?.placeholder || ""}
                onChange={handleCustomFieldChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g. Enter your company name"
              />
            </div>
            
            {newCustomField?.type === "select" && (
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Options (comma separated)</label>
                <input
                  type="text"
                  name="options"
                  value={newCustomField?.options || ""}
                  onChange={handleCustomFieldChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Option 1, Option 2, Option 3"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter options separated by commas
                </p>
              </div>
            )}
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="required_field"
                name="required"
                checked={newCustomField?.required || false}
                onChange={handleCustomFieldChange}
                className="mr-2"
              />
              <label htmlFor="required_field" className="text-gray-700">
                Required Field
              </label>
            </div>
          </div>
          
          <button
            type="button"
            onClick={addCustomField}
            className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
          >
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomFormFields;