import React, { useEffect, useState } from "react";
import "./user.css";
import SettingsIcon from "./assets/settings.png";
import SearchIcon from "./assets/search.png";
import SearchIcon2 from "./assets/search2.png";
import UserMessages from "../Usermessages/UserMessages";
import NightMode from "./assets/night.png";
import DayMode from "./assets/day.png";
import SettingsIcon2 from "./assets/settings2.png";
import Request from "./Request/request";
import axios from "axios";
import Requested from "./Requested/requested";

const User = ({ userId, isDarkMode, toggleDarkMode }) => {
  const [showRequestedPopup, setShowRequestedPopup] = useState(false);
  const [showRequestsPopup, setShowRequestsPopup] = useState(false);
  const [requestedUsers, setRequestedUsers] = useState([]);
  const [requestsUsers, setRequestsUsers] = useState([]);
  const count = 0;

  useEffect(() => {
    const fetchData = async () => {
      // console.log(userId);
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_SERVER_PORT}/api/requested/${userId}`
        );
        const users = result.data;
        if (users) {
          setRequestedUsers(users);
        } else {
          setRequestedUsers([]);
        }

        const requestsuser = await axios.get(
          `${process.env.REACT_APP_SERVER_PORT}/api/requests/${userId}`
        );
        setRequestsUsers(requestsuser.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);
  // console.log(requestsUsers);
  const handleClick = () => {
    console.log("clicked");
  };

  const handleRequestedClick = () => {
    setShowRequestedPopup(true);
  };

  const handleRequestsClick = () => {
    setShowRequestsPopup(true);
  };
  // console.log(userId);
  return (
    <div
      className={
        isDarkMode ? "user-container dark-mode" : "user-container light-mode"
      }
    >
      <div className="user-heading-container">
        <div className="user-heading">Users</div>
        <div className="user-settings">
          <img
            className="settings-icon"
            src={isDarkMode ? SettingsIcon2 : SettingsIcon}
            alt="Settings"
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          />
          <img
            className="mode-switch"
            onClick={toggleDarkMode}
            src={isDarkMode ? NightMode : DayMode}
            height={30}
            width={60}
            alt="mode-switch"
          />
        </div>
      </div>
      <div className="user-message-container-request">
        <div
          className="user-message-requested pointer"
          onClick={handleRequestedClick}
        >
          Requested({requestedUsers.length})
        </div>{" "}
        <div
          className="user-message-requests pointer"
          onClick={handleRequestsClick}
        >
          Requests({requestsUsers.length})
        </div>
      </div>
      <div className="user-message-search">
        <div className="search-icon">
          <img src={isDarkMode ? SearchIcon2 : SearchIcon} alt="Search" />
        </div>
        <input type="text" placeholder="Search user with username" />
      </div>
      {/* Popup for Requested */}
      {showRequestedPopup && (
        <div className="popup-container">
          <div
            className={isDarkMode ? "popup-content dark-mode" : "popup-content"}
          >
            <div className="user-message-requests-heading">
              Requested
              <button
                className="popup-close-button-requests"
                onClick={() => setShowRequestedPopup(false)}
              >
                X
              </button>{" "}
            </div>
            <div
              className={
                requestedUsers.length > 0
                  ? "user-message-requests-messages scrollbar-style"
                  : "user-message-requests-no-messages"
              }
            >
              {requestedUsers.length > 0 ? (
                <div>
                  {requestedUsers.map((user) => (
                    <Requested
                      key={user} // Make sure each component has a unique key
                      userId={user}
                      currUser={userId}
                      isDarkmode={isDarkMode}
                      count={requestedUsers.length}
                    />
                  ))}
                </div>
              ) : (
                <div>No requests</div>
              )}
            </div>
            {/* Add content for Requested popup */}
          </div>
        </div>
      )}

      {showRequestsPopup && (
        <div className="popup-container">
          <div
            className={isDarkMode ? "popup-content dark-mode" : "popup-content"}
          >
            <div className="user-message-requests-heading">
              Requests{" "}
              <button
                className="popup-close-button-requests"
                onClick={() => setShowRequestsPopup(false)}
              >
                X
              </button>
            </div>
            <div
              className={
                requestsUsers.length > 0
                  ? "user-message-requests-messages scrollbar-style"
                  : "user-message-requests-no-messages"
              }
            >
              {requestsUsers.length > 0 ? (
                <div>
                  {requestsUsers.map((user) => (
                    <Request
                      key={user}
                      userId={user}
                      currUser={userId}
                      IsDarkmode={isDarkMode}
                      count={requestsUsers.length}
                    />
                  ))}
                </div>
              ) : (
                <div>No requests</div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="user-message-details">
        <div className="user-message-scrollable">
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          <UserMessages isDarkMode={isDarkMode} />
          {/* Render more UserMessages components as needed */}
        </div>
      </div>
    </div>
  );
};

export default User;
