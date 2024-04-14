import React from "react";
import "./Navbar.css";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  const handleClickSignin = () => {
    navigate("/signin");
  };
  return (
    <div className="landing-page-navbar-container">
      <div className="landing-page-navbar-heading">
        <div className="landing-page-navbar-heading-container">
          <div
            className="landing-page-navbar-heading-logo"
            onClick={handleClick}
          >
            <img src={Logo} alt="logo" height={30} />
            <div className="landing-page-navbar-heading-logo-text"> Chaty</div>
          </div>
          <div
            className="landing-page-navbar-heading-signin"
            onClick={handleClickSignin}
          >
            Sign in
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
