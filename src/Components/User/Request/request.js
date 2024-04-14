import React from "react";
import "./request.css";
import Noprofile from "../../Usermessages/assets/user.png";
import BlackCheck from "../assets/check-mark.png";
import WhiteCheck from "../assets/check-mark2.png";
import BlackCross from "../assets/x-mark.png";
import WhiteCross from "../assets/x-mark2.png";
const Request = ({ userId, IsDarkmode }) => {
  // console.log(userId);
  return (
    <div
      className={
        IsDarkmode
          ? "user-message-requested-container dark-mode"
          : "user-message-requested-container"
      }
    >
      <div className="user-message-requested-main">
        <div className="user-message-requested-userinfo">
          <div className="user-message-requested-user-img">
            <img src={Noprofile} height={50} />
          </div>
          <div className="user-message-requested-username">Username</div>
        </div>
        <div className="user-message-requested-buttons">
          <img
            className="user-message-requested-img-buttons"
            src={IsDarkmode ? WhiteCheck : BlackCheck}
            alt="user-img"
            height={30}
            style={{ cursor: "pointer" }}
          />
          <img
            className="user-message-requested-img-buttons"
            src={IsDarkmode ? WhiteCross : BlackCross}
            alt="user-img"
            height={30}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Request;
