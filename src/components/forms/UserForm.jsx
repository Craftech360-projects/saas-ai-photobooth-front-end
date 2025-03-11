import { useState } from "react";

export function UserForm({ 
  onSubmit, 
  initialValues, 
  requireName = true, 
  requireEmail = true, 
  position = "middle", 
  style,
  formFields = [],
  formTitle = "Please Enter Your Details",
  buttonText = "Continue",
  buttonStyle = {},
  formStyle = {},
  buttonBackgroundUrl = ""
}) {
  console.log("UserForm props:", { 
    initialValues, requireName, requireEmail, position, style, 
    formFields, buttonBackgroundUrl 
  });
  
  const [formData, setFormData] = useState(initialValues || {});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  // Ensure horizontal centering is preserved
  const combinedStyle = { 
    ...style,
    left: "50%", // Force horizontal centering
    transform: style?.transform || "translateX(-50%)" // Preserve transform or set default
  };
  
  // Apply button background if provided
  const combinedButtonStyle = {
    ...buttonStyle,
    width: buttonStyle.width || '312px',
    height: buttonStyle.height || '86px',
    backgroundColor: buttonStyle.backgroundColor || '#8b5cf6',
    color: buttonStyle.color || 'white',
    borderRadius: buttonStyle.borderRadius || '8px',
    fontSize: buttonStyle.fontSize || '16px',
    fontWeight: buttonStyle.fontWeight || 'normal',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    margin: buttonStyle.alignSelf === 'center' ? '0 auto' : 
           buttonStyle.alignSelf === 'flex-start' ? '0 auto 0 0' : 
           buttonStyle.alignSelf === 'flex-end' ? '0 0 0 auto' : '0 auto'
  };
  
  if (buttonBackgroundUrl) {
    combinedButtonStyle.backgroundImage = `url(${buttonBackgroundUrl})`;
    combinedButtonStyle.backgroundSize = '100% 100%';
    combinedButtonStyle.backgroundPosition = 'center';
    combinedButtonStyle.backgroundRepeat = 'no-repeat';
    // Make text transparent if using a background image with text
    combinedButtonStyle.color = buttonStyle.color || 'white';
  }
  
  // Create styles for labels and inputs based on formStyle
  const labelStyle = {
    color: formStyle.labelColor || formStyle.color || 'inherit',
    fontSize: formStyle.labelFontSize || '16px',
    fontWeight: formStyle.labelFontWeight || 'normal',
    fontStyle: formStyle.labelFontStyle || 'normal',
  };
  
  const inputStyle = {
    backgroundColor: formStyle.inputBackgroundColor || '',
    color: formStyle.inputTextColor || '',
    borderColor: formStyle.inputBorderColor || '',
    borderRadius: formStyle.inputBorderRadius || '',
    borderWidth: formStyle.inputBorderWidth || '',
    height: formStyle.inputHeight || '',
    padding: formStyle.inputPadding || '',
    fontSize: formStyle.inputFontSize || '',
  };
  
  return (
    <div 
      className="p-6 rounded-lg max-w-3xl w-full absolute"
      style={{...combinedStyle, ...formStyle}}
    >
      <h2 className="text-4xl font-bold mb-6 text-center" style={labelStyle}>{formTitle}</h2>
      
      <form onSubmit={handleSubmit}>
        {requireName && (
          <div className="mb-4">
            <label className="block mb-2" style={labelStyle}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-2 border rounded-md"
              style={inputStyle}
              required
            />
          </div>
        )}
        
        {requireEmail && (
          <div className="mb-4">
            <label className="block mb-2" style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              style={inputStyle}
              required
            />
          </div>
        )}
        
        {/* Render custom fields */}
        {formFields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2" style={labelStyle}>{field.label}</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              style={inputStyle}
              required={field.required}
              placeholder={field.placeholder || ""}
            />
          </div>
        ))}
        
        <div className="flex justify-center gap-5" style={{ marginTop: formStyle.buttonTopMargin || '20px' }}>
          <button
            type="submit"
            className="shadow-md transition-colors"
            style={combinedButtonStyle}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}