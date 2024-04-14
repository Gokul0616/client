import React from "react";
import "./LandingPage.css";
import Navbar from "./Navbar/Navbar";
import LandingpageImg from "./assets/image1.png";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signup");
  };
  return (
    <div className="landing-page-container">
      <Navbar />
      <div className="landing-page-details-container">
        <div className="landing-page-details">
          <div className="landing-page-details-names">
            <div className="landing-page-details-heading-name1">
              Connect, chat, and stay close. Your conversations, your world
            </div>
            <div className="landing-page-details-heading-name2">
              SignUp and Start Chatting
            </div>
            <div className="landing-page-details-heading-name2">
              <button
                onClick={handleClick}
                className="landing-page-signup-button"
                style={{ cursor: "pointer" }}
              >
                SignUp
              </button>
            </div>
          </div>
        </div>
        <div className="landing-page-details-img">
          <img src={LandingpageImg} alt="landing-page-image" height={500} />
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
