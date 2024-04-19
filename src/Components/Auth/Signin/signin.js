import React, { useState } from "react";
import "./signin.css";
import Logo from "../../Landing page/assets/logo.png";
import messageImg from "../assets/message-image.png";
import { Link, useNavigate } from "react-router-dom";
import Hide from "../assets/hide.png";
import axios from "axios";
import Show from "../assets/show.png";

const Signin = () => {
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Function to update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Function to validate form fields
  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setLoading(true); // Set loading to true before making the API call
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_SERVER_PORT}/api/signin`,
          formData
        );
        if (result.data.error) {
          setSignupError(result.data.error);
        } else if (result.data.result === "Successful") {
          setSignupError("");
          const userId = result.data.userData.id;
          navigate(`/chat/${userId}`);
        }
      } catch (error) {
        console.error("Error sending data to backend:", error);
      } finally {
        setLoading(false); // Set loading back to false after receiving the response
      }
    } else {
      console.log("Form is invalid. Please fix errors.");
    }
  };

  const backendApi = async (formData) => {
    try {
      // console.log(formData);
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER_PORT}/api/signin`,
        formData
      );
      // setLoading(true);
      // console.log(result);
      if (result.data.error) {
        setSignupError(result.data.error);
      } else if (result.data.result == "Successful") {
        setSignupError("");
        // console.log(result.data.userData.id);
        const userId = result.data.userData.id;
        navigate(`/chat/${userId}`);
      }
    } catch (error) {
      // Handle error
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <div className="signin-container-main">
      <div className="signin-container">
        <div className="signin-images-container">
          <div className="signin-image-details">
            <div className="sigin-image-logo">
              <div className="sigin-image-logo-text">
                <img src={Logo} alt="logo" height={30} />
                Chaty
              </div>
            </div>
            <div className="signin-image">
              <img src={messageImg} height={200} alt="message" />
            </div>
            <div className="signin-image">
              <div className="signin-image-text">
                Connect, chat, and stay close. Your conversations, your world
              </div>
            </div>
          </div>
        </div>
        <div className="signin-form-container">
          <div className="signin-form-heading">Signin</div>
          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="signin-form-input-container">
              <div className="signin-form-input-label">Email:</div>
              <input
                type="email"
                className="signin-form-input"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
              <div className="signin-form-input-label">Password:</div>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="signin-form-input"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <img
                  src={showPassword ? Hide : Show}
                  height={20}
                  className="toggle-password-button"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                />
              </div>
              {errors.password && (
                <div className="error error-signin-password">
                  {errors.password}
                </div>
              )}
              {signupError && (
                <div className="error error-signin-password">{signupError}</div>
              )}
            </div>
            <div className="signin-form-button-container">
              <button type="submit" className="signin-form-button">
                {loading ? <span className="loading-dots"></span> : "Signin"}
              </button>
            </div>
            <div className="signin-form-footer">
              <div className="signin-form-footer-text">
                Reset Password?
                <Link className="link" to={"/reset-password"}>
                  Reset
                </Link>
              </div>{" "}
              <div className="signin-form-footer-text">
                Don't have an account?
                <Link className="link" to={"/signup"}>
                  Signup
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
