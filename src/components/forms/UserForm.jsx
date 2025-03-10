import { useState } from "react";

export function UserForm({ onSubmit, initialValues, requireName = true, requireEmail = true, position = "middle", style }) {
  console.log("UserForm props:", { initialValues, requireName, requireEmail, position, style });
  
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
  
  return (
    <div 
      className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full absolute"
      style={combinedStyle}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Please Enter Your Details</h2>
      
      <form onSubmit={handleSubmit}>
        {requireName && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}
        
        {requireEmail && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );
}