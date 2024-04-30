import React, { useEffect, useState } from "react";
import "./UserMessages.css";
import UserIcon from "./assets/user.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserMessages = ({ userId, isDarkMode, currUser }) => {
  // const count = 1;
  const message = "messages new message founds inbox";
  const [userDetails, setUserDetails] = useState([]);
  const [count, setUnreadCount] = useState([]);
  const [disappear, setDisappear] = useState(true);
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
    };
    fetchData();
  }, []);
  // console.log(userDetails);
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_PORT}/api/usermessages/unread-count/${userId}/${currUser}`
        );
        setUnreadCount(response.data.unreadCount);
        // console.log(response.data.unreadCount > 0);
        if (count > 0) {
          setDisappear(false);
        }
      } catch (error) {
        console.error("Error fetching unread message count:", error);
      }
    };

    fetchUnreadCount(); // Fetch unread count initially

    // Fetch unread count periodically
    const intervalId = setInterval(fetchUnreadCount, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [userId, currUser]);

  // console.log(count);
  const handleClick = async () => {
    // navigate(`/chat/${userId}/?=${currUser}`);
    const currentUserId = currUser;
    const messageUserId = userId;
    navigate(`/chat/${currentUserId}/${messageUserId}`);
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_PORT}/api/usermessages/read/${userId}/${currUser}`
    );
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
      <div
        className={
          disappear
            ? "user-message-newmessage-count Disappear"
            : "user-message-newmessage-count"
        }
      >
        {count}
      </div>
    </div>
  );
};

export default UserMessages;
