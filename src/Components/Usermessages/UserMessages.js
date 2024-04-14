import React, { useEffect } from "react";
import "./UserMessages.css";
import UserIcon from "./assets/user.png";
import axios from "axios";

const UserMessages = ({ isDarkMode }) => {
  const count = 1;
  const message = "messages new message founds inbox";

  // Extract the first 32 characters, including spaces, and trim any excess
  const truncatedMessage = message.slice(0, 33).trim();
  // console.log(truncatedMessage);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.get(
  //       `${process.env.REACT_APP_SERVER_PORT}/api/users/`
  //     );
  //     console.log(result);
  //   };
  //   fetchData();
  // }, []);
  return (
    <div
      className={
        isDarkMode
          ? "user-new-messages pointer dark-mode"
          : "user-new-messages pointer light-mode"
      }
    >
      <div className="user-message-img-container">
        <img
          className="user-message-img "
          src={UserIcon}
          alt="user-imge"
          height={50}
          width={50}
        />
      </div>
      <div className="user-message-userName-container">
        <div className="user-message-newmessage-username ">Username</div>
        <div className="user-message-newmessage-messages ">
          {truncatedMessage}
        </div>
      </div>
      <div className="user-message-newmessage-count">{count}</div>
    </div>
  );
};

export default UserMessages;
