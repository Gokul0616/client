import React, { useState } from "react";
import "./resetpassword.css";
import Logo from "../../Landing page/assets/logo.png";
import Hide from "../assets/hide.png";
import Show from "../assets/show.png";

const Resetpassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.password.trim()) {
      newErrors.password = "New password is required*";
      isValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your new password*";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match*";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // Form submission logic
      console.log("Form is valid. Submitting...");
    } else {
      console.log("Form is invalid. Please fix errors.");
    }
  };

  return (
    <div className="reset-password-container-main">
      <div className="reset-password-container">
        <div className="reset-password-heading">
          <div className="reset-password-heading-text">
            <img src={Logo} alt="logo" height={30} />
            Chaty
          </div>
        </div>
        <div className="reset-password-heading-text-2">Reset Password</div>
        <form className="reset-password-form" onSubmit={handleSubmit}>
          <div className="reset-password-form-inputs">
            <div className="reset-password-form-input-label">New Password:</div>
            <input
              placeholder="Enter your new password"
              type={showPassword ? "text" : "password"}
              name="password"
              className="reset-password-form-input"
              value={formData.password}
              onChange={handleChange}
            />
            <img
              className="toggle-password-button"
              onClick={toggleShowPassword}
              height={20}
              style={{ cursor: "pointer" }}
              src={showPassword ? Hide : Show}
            />
            {errors.password && (
              <div className="error-reset-password">{errors.password}</div>
            )}
          </div>
          <div className="reset-password-form-inputs">
            <div className="reset-password-form-input-label">
              Confirm New Password:
            </div>
            <input
              placeholder="Confirm your new password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="reset-password-form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <img
              className="toggle-password-button"
              onClick={toggleShowConfirmPassword}
              height={20}
              style={{ cursor: "pointer" }}
              src={showConfirmPassword ? Hide : Show}
            />
            {errors.confirmPassword && (
              <div className="error-reset-password">
                {errors.confirmPassword}
              </div>
            )}
          </div>
          <div className="reset-password-form-button-container">
            <button type="submit" className="reset-password-form-button">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;
