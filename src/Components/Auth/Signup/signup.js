import React, { useState, useEffect } from "react";
import Logo from "../../Landing page/assets/logo.png";
import "./signup.css";
import MessageImg from "../assets/signup-image.png";
import { Link, useNavigate } from "react-router-dom";
import Show from "../assets/show.png";
import Hide from "../assets/hide.png";
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupError, setSignupError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required*";
      isValid = false;
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required*";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required*";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required*";
      isValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please re-enter your password*";
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
      console.log("Form is valid. Submitting...");
      // console.log("Form data:", formData);
      backendApi(formData);
    } else {
      console.log("Form is invalid. Please fix errors.");
    }
  };

  const backendApi = async (formData) => {
    const { firstname, lastname, email, password } = formData;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_PORT}/api/signup`,
        {
          firstname,
          lastname,
          email,
          password,
        }
      );
      // console.log(response.data.id);
      const userId = response.data.id;
      // Handle response if needed
      if (response.data.error) {
        setSignupError(response.data.error);
      } else {
        setSignupError("");
        navigate(`/chat/${userId}`);
      }
    } catch (error) {
      // Handle error
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <div className="signup-container-main">
      <div className="signup-container">
        <div className="signup-image-container">
          <div className="signup-image-details">
            <div className="signup-image-logo">
              <div className="signup-image-logo-text">
                <img src={Logo} alt="logo" height={30} />
                Chaty
              </div>
            </div>
            <div className="signup-image-img">
              <img src={MessageImg} alt="signup-image" height={300} />
            </div>
            <div className="signup-image-text">
              Unlock a world of endless conversations. Sign up today!
            </div>
          </div>
        </div>
        <div className="signup-form-container">
          <div className="signup-form-heading">SignUp</div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-form-input-container">
              <div className="signupform-input-name">
                <div className="signup-form-input-label">First Name:</div>
                <input
                  className="signup-form-input"
                  type="text"
                  name="firstname"
                  placeholder="Enter your first name"
                  value={formData.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && (
                  <div className="error">{errors.firstname}</div>
                )}
              </div>
              <div className="signupform-input-name">
                <div className="signup-form-input-label">Last Name:</div>
                <input
                  className="signup-form-input"
                  type="text"
                  name="lastname"
                  placeholder="Enter your last name"
                  value={formData.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && (
                  <div className="error">{errors.lastname}</div>
                )}
              </div>
            </div>
            <div className="signup-form-input-container">
              <div className="signupform-input-email">
                <div className="signup-form-input-label">Email:</div>
                <input
                  className="signup-form-input"
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
                {signupError && <div className="error">{signupError}</div>}
              </div>
            </div>
            <div className="signup-form-input-container">
              <div className="signupform-input-name  signupform-input-password">
                <div className="signup-form-input-label">Password:</div>
                <input
                  className="signup-form-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <img
                  src={showPassword ? Show : Hide}
                  className="eye"
                  alt="eye"
                  height={20}
                  onClick={togglePasswordVisibility}
                />
                {errors.password && (
                  <div className="error error-password">{errors.password}</div>
                )}
              </div>
              <div className="signupform-input-name signupform-input-password">
                <div className="signup-form-input-label ">
                  Confirm Password:
                </div>
                <input
                  className="signup-form-input"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <img
                  src={showConfirmPassword ? Show : Hide}
                  className="eye"
                  height={20}
                  alt="eye"
                  onClick={toggleConfirmPasswordVisibility}
                />
                {errors.confirmPassword && (
                  <div className="error error-confirm-password">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>
            <div className="signup-form-button-container">
              <button className="signup-form-button">Create New Account</button>
            </div>
          </form>
          <div className="signup-form-footer-text">
            Already have an account?{" "}
            <Link className="link" to={"/signin"}>
              SignIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
