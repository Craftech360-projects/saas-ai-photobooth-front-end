import { useState } from "react";

export function UserForm({ onSubmit, initialValues, requireName = true, requireEmail = true }) {
  const [formData, setFormData] = useState({
    name: initialValues?.name || "",
    email: initialValues?.email || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (requireName && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (requireEmail && !formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      requireEmail && 
      formData.email.trim() && 
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Tell us about yourself</h2>
      
      <form onSubmit={handleSubmit}>
        {requireName && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-violet-500`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
        )}
        
        {requireEmail && (
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Your Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-violet-500`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        )}
        
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 transition-colors"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}