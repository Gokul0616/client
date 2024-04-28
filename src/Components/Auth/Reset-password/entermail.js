import React, { useState } from "react";
import "./resetpassword.css";
import Logo from "../../Landing page/assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EnterMail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // State to store the entered email
  const [loading, setLoading] = useState();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const result = await axios.post(
      `${process.env.REACT_APP_SERVER_PORT}/auth/check-user`,
      { email }
    );
    // console.log(result.data == "success");
    if (result.data === "success") {
      setLoading(false);
      setError(false);
      navigate(`/check-mail`);
    } else {
      setLoading(false);
      setError(true);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value); // Update the email state as the user types
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
        <div className="reset-password-heading-text-2">Enter Your Email ID</div>
        <form className="reset-password-form" onSubmit={handleSubmit}>
          <div className="reset-password-form-inputs">
            <div className="reset-password-form-input-label">Email:</div>
            <input
              placeholder="Enter your email"
              type="email"
              name="email"
              className="reset-password-form-input"
              value={email}
              onChange={handleChange}
            />
          </div>
          {error && (
            <div className="error-reset-password error-email-enter">
              "User not found"
            </div>
          )}
          <div> We have sent a mail to your email id</div>
          <div className="reset-password-form-button-container">
            <button type="submit" className="reset-password-form-button">
              {loading ? <span className="loading-dots"></span> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterMail;
