import React, { useEffect, useState } from "react";
import "./UserMessages.css";
import UserIcon from "./assets/user.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserMessages = ({ userId, isDarkMode, currUser }) => {
  const count = 1;
  const message = "messages new message founds inbox";
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();
  // Extract the first 32 characters, including spaces, and trim any excess
  const truncatedMessage = message.slice(0, 33).trim();
  // console.log(truncatedMessage);

  useEffect(() => {
    const fetchData = async () => {
      const userDetails = await axios.get(
        `${process.env.REACT_APP_SERVER_PORT}/api/user/${userId}`
      );
      // console.log( userDetails.data );
      setUserDetails(userDetails.data);
      // const result = await axios.get(
      //   `${process.env.REACT_APP_SERVER_PORT}/api/usermessages/${userId}/${currUser}`
      // );
      // console.log(result);
    };
    fetchData();
  }, []);
  // console.log(userDetails);
  const handleClick = () => {
    // navigate(`/chat/${userId}/?=${currUser}`);
    const currentUserId = currUser;
    const messageUserId = userId;
    navigate(`/chat/${currentUserId}/${messageUserId}`);
  };

  return (
    <div
      className={
        isDarkMode
          ? "user-new-messages pointer dark-mode"
          : "user-new-messages pointer light-mode"
      }
      onClick={handleClick}
    >
      <div className="user-message-img-container">
        <img
          className="user-message-img "
          src={userDetails.profileurl ? userDetails.profileurl : UserIcon}
          alt="user-imge"
          height={50}
          width={50}
        />
      </div>
      <div className="user-message-userName-container">
        <div className="user-message-newmessage-username ">
          {userDetails.firstname} {userDetails.lastname}
        </div>
        <div className="user-message-newmessage-messages ">
          {truncatedMessage}
        </div>
      </div>
      <div className="user-message-newmessage-count">{count}</div>
    </div>
  );
};

export default UserMessages;
