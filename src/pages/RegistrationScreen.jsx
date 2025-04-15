import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegistrationScreen.css";
import "../styles/global.css";

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "yamuna",
    contact: "8197142794",
    email: "yamun@craftech360.com",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // if (!formData.contact.trim()) {
    //   newErrors.contact = "Contact is required";
    // } else if (!/^\d{10}$/.test(formData.contact)) {
    //   newErrors.contact = "Contact must be 10 digits";
    // }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Store user data in localStorage or context
      localStorage.setItem("userData", JSON.stringify(formData));
      navigate("/gender-selection");
    }
  };

  return (
    <div className="screen content-background">
      <div className="registration-container">
        <h1 className="title2">Registration</h1>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact No:</label>
            <input
              id="contact"
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="input-field"
            />
            {errors.contact && <span className="error">{errors.contact}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <button type="submit" className="button submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationScreen;
