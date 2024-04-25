import React, { useEffect, useState } from "react";
import AddGroup from "./assets/add-group.png";
import sendRequest from "../User/assets/check-mark.png";
import sendRequest2 from "../User/assets/check-mark2.png";
import AddGroup2 from "./assets/add-group2.png";
import "./SuggestedFriends.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import NoProfile from "../Usermessages/assets/user.png";

const SuggestedFriends = ({ isDarkMode, userId }) => {
  const currUser = userId;
  const [shuffledUsers, setShuffledUsers] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [requestedUsers, setRequestedUsers] = useState([]);
  const [isRequested, setIsRequested] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_SERVER_PORT}/api/users/${userId}`
        );
        const users = result.data;

        // Shuffle the users list once
        const shuffled = shuffle(users);
        setShuffledUsers(shuffled);

        // Select initial users to display
        const selectedUsers = showAll ? shuffled : shuffled.slice(0, 3);
        setSuggestedFriends(selectedUsers);

        // check if request was already send

        const checkReq = await axios.get(
          `${process.env.REACT_APP_SERVER_PORT}/api/checkRequest/${userId}`
        );
        // const receiverIds = checkReq.data.map((item) => item.receiver_id);
        // const uniqueReceiverIds = [...new Set(receiverIds)]; // Remove duplicates
        setRequestedUsers(checkReq.data);

        // console.log(checkReq.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [userId, showAll]);
  // console.log(requestedUsers);
  // Function to shuffle array
  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  const handleSendRequest = async (userId) => {
    const result = await axios.post(
      `${process.env.REACT_APP_SERVER_PORT}/api/sendRequest/`,
      { senderId: currUser, receiverId: userId }
    );
    // console.log(result);
    setRequestedUsers((prevUsers) => [...prevUsers, userId]);
    if (result) {
      toast("Request send");
    }
  };
  const isUserRequested = (userId) => {
    return requestedUsers.includes(userId);
  };
  return (
    <div className="suggested-friends-container">
      {suggestedFriends.slice(0, 3).map((friend) => (
        <div className="suggested-friends-friends-container" key={friend.id}>
          <div className="suggested-friends-friends-img">
            <img
              src={friend.profileurl ? friend.profileurl : NoProfile}
              alt="user-img"
              className="account-user-img"
            />
          </div>
          <div className="suggested-friends-friends-username-container">
            <div className="suggested-friends-friends-username">
              <div className="suggested-friends-friends-username-name">
                {friend.firstname} {friend.lastname}
              </div>
              <div className="suggested-friends-friends-username-bio">
                {friend.bio}
              </div>
            </div>
            <div className="suggested-friends-friends-add">
              <img
                src={
                  isUserRequested(friend.user_id)
                    ? isDarkMode
                      ? sendRequest2
                      : sendRequest
                    : isDarkMode
                    ? AddGroup2
                    : AddGroup
                }
                height={20}
                onClick={() => handleSendRequest(friend.user_id)}
                alt="Add Group"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      ))}
      {showAll ? (
        shuffledUsers.slice(3, 15).map((friend) => (
          <div className="suggested-friends-friends-container" key={friend.id}>
            <div className="suggested-friends-friends-img">
              <img
                src={friend.profileurl || NoProfile}
                alt="user-img"
                className="account-user-img"
              />
            </div>
            <div className="suggested-friends-friends-username-container">
              <div className="suggested-friends-friends-username">
                <div className="suggested-friends-friends-username-name">
                  {friend.firstname} {friend.lastname}
                </div>
                <div className="suggested-friends-friends-username-bio">
                  {friend.bio}
                </div>
              </div>
              <div className="suggested-friends-friends-add">
                <img
                  src={
                    isUserRequested(friend.user_id)
                      ? isDarkMode
                        ? sendRequest2
                        : sendRequest
                      : isDarkMode
                      ? AddGroup2
                      : AddGroup
                  }
                  height={20}
                  alt="Add Group"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSendRequest(friend.user_id)}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="show-more-button" onClick={handleShowMore}>
          Show More
        </div>
      )}
      {showAll && (
        <div className="show-more-button" onClick={handleShowLess}>
          Show Less
        </div>
      )}
    </div>
  );
};

export default SuggestedFriends;
