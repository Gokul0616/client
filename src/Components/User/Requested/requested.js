import React, { useEffect, useState } from "react";
import "./requested.css";
import Noprofile from "../../Usermessages/assets/user.png";
import axios from "axios";

const Requested = ({ currUser, userId, IsDarkmode, count }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [remove, setRemove] = useState("cancel request");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_SERVER_PORT}/api/user/${userId}`
        );
        const users = result.data;
        setUserDetails(users);
        // console.log(result);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, [userId]);
  const handleClick = async () => {
    const result = await axios.delete(
      `${process.env.REACT_APP_SERVER_PORT}/api/request-delete/${userId}/${currUser}`
    );
    const removedResult = result.data;
    if (removedResult == "success") {
      {
        setRemove("Removed");
      }
    }
  };
  // console.log(remove);
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
            <img
              src={userDetails.profileurl ? userDetails.profileurl : Noprofile}
              height={50}
              alt="profile"
              className="user-message-requested-profile"
            />
          </div>
          <div className="user-message-requested-username">
            {userDetails.firstname} {userDetails.lastname}
          </div>
        </div>
        <div className="user-message-requested-buttons">
          <button
            className="user-message-requested-button-cancel"
            onClick={handleClick}
          >
            {remove}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Requested;
