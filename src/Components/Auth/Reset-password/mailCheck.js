import React, { useEffect } from "react";
import "./resetpassword.css";
import { useNavigate } from "react-router-dom";

const CheckMail = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signin");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="check-mail-container">
      <div className="check-mail-main-container">
        <div className="check-mail-heading">Check your mail</div>
        <div className="check-mail-heading">
          We have send a Reset password link to your Mail
        </div>
      </div>
    </div>
  );
};
export default CheckMail;
