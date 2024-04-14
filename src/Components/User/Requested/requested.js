import React from "react";
import "./requested.css";
import Noprofile from "../../Usermessages/assets/user.png";

const Requested = ({ userId, IsDarkmode }) => {
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
          <button className="user-message-requested-button-cancel">
            Cancel Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default Requested;
