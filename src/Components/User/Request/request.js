import React, { useState, useEffect } from "react";
import "./request.css";
import Noprofile from "../../Usermessages/assets/user.png";
import BlackCheck from "../assets/check-mark.png";
import WhiteCheck from "../assets/check-mark2.png";
import BlackCross from "../assets/x-mark.png";
import WhiteCross from "../assets/x-mark2.png";
import axios from "axios";
const Request = ({ count, userId, IsDarkmode, currUser }) => {
  const [remove, setRemove] = useState();
  const [userDetails, setUserDetails] = useState([]);
  console.log(userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_SERVER_PORT}/api/user/${userId}`
        );
        const users = result.data;
        console.log(users);
        setUserDetails(users);
        // console.log(result);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, [userId]);
  // console.log(userDetails);
  const handleAccept = async () => {
    const result = await axios.post(
      `${process.env.REACT_APP_SERVER_PORT}/api/request-accept/${userId}/${currUser}`
    );
    const removedResult = result.data;
    // console.log(removedResult);
    if (removedResult == "success") {
      {
        setRemove("Accepted");
      }
    }
  };
  const handleCancel = async () => {
    const result = await axios.delete(
      `${process.env.REACT_APP_SERVER_PORT}/api/request-delete/${currUser}/${userId}`
    );
    const removedResult = result.data;
    // console.log(removedResult);
    if (removedResult == "success") {
      {
        setRemove("Removed");
      }
    }
  };
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
              className="user-message-requested-img"
              src={userDetails.profileurl ? userDetails.profileurl : Noprofile}
              height={50}
            />
          </div>
          <div className="user-message-requested-username">
            {userDetails.firstname} {userDetails.lastname}
          </div>
        </div>

        <div className="user-message-requested-buttons">
          {remove == "Accepted" || remove == "Removed" ? (
            <div className="user-message-requested-accepted"> {remove}</div>
          ) : (
            <div>
              <img
                className="user-message-requested-img-buttons"
                src={IsDarkmode ? WhiteCheck : BlackCheck}
                alt="user-img"
                height={30}
                onClick={handleAccept}
                style={{ cursor: "pointer" }}
              />
              <img
                className="user-message-requested-img-buttons"
                src={IsDarkmode ? WhiteCross : BlackCross}
                alt="user-img"
                height={30}
                onClick={handleCancel}
                style={{ cursor: "pointer" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Request;
