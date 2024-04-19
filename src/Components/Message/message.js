import React, { useEffect, useState } from "react";
import "./message.css";
import OptionsIcon from "./Assets/more.png";
import OptionsIcon2 from "./Assets/more2.png";
import axios from "axios";

function Message({ userId, currUser, isDarkMode }) {
  const [messageUserDetails, setMessageUserDetails] = useState([]);
  const [userInput, setUserInput] = useState("");
  // console.log(userId, currUser);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showContextMenu, setShowContextMenu] = useState(false);
  const Name = "{Name}";
  useEffect(() => {
    // console.log("fetched");
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_PORT}/api/user/${currUser}`
      );
      // console.log( res.data );
      setMessageUserDetails(res.data);
    };
    fetchData();
  }, [userId, currUser]);

  const handleChange = (event) => {
    setUserInput(event.target.value); // Update user input state
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission

    // Check if userInput is not empty
    if (userInput.trim() !== "") {
      // console.log("User Input:", userInput); // Log user input
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER_PORT}/api/message/${userId}/${currUser}`,
        {
          message: userInput,
        }
      );
      // console.log(result);
      setUserInput(""); // Clear input field
    } else {
      // Handle case where userInput is empty
      console.log("User input is empty");
    }
  };

  const data = [
    { myMessage: "Hi, How are you? ", time: "9:47AM" },
    { opponentMessage: "I am fine , How about you? ", time: "9:48AM" },
    { myMessage: "I am fine ", time: "9:49AM" },
    { myMessage: "How about your job? ", time: "9:50AM" },
    { opponentMessage: "I am doing well ", time: "9:51AM" },
    { opponentMessage: "How about yours? ", time: "9:52AM" },
    { myMessage: "Yeah, fine? ", time: "9:53AM" },
    { opponentMessage: "Shall we meet tonight dinner? ", time: "9:54AM" },
    { myMessage: "Yes, Sure ", time: "9:55AM" },
  ];

  // Event handler for displaying the context menu
  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent default right-click behavior
    const posX = event.pageX;
    const posY = event.pageY;
    setContextMenuPosition({ x: posX, y: posY });
    setShowContextMenu(true);
  };
  const handleClick = () => {
    console.log("clicked");
  };

  // Event handler for hiding the context menu
  const hideContextMenu = () => {
    setShowContextMenu(false);
  };

  return (
    <div className="message-container">
      <div className="user-heading-container">
        <div className="user-heading-bio">
          <div className="user-heading-bio-name">
            {messageUserDetails.firstname}
            {messageUserDetails.lastname}
          </div>
          <div className="user-heading-bio-text">{messageUserDetails.bio}</div>
        </div>
        <div className="user-settings">
          <img
            className="settings-icon"
            src={isDarkMode ? OptionsIcon2 : OptionsIcon}
            alt="Settings"
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          />
        </div>
      </div>
      <div
        className="user-message-messaging-container"
        onContextMenu={(event) => event.preventDefault()}
      >
        <div className="user-message-messaging-message">
          {/* Render messages dynamically */}
          {data.map((item, index) => (
            <React.Fragment key={index}>
              {item.myMessage && (
                <div className="user-message-opponent-message-container">
                  <div
                    className="user-message-opponent-message"
                    onContextMenu={handleContextMenu}
                  >
                    <div className="user-message-opponent-message-message">
                      {item.myMessage}
                    </div>
                    <div className="user-message-opponent-message-time">
                      {item.time}
                    </div>
                  </div>
                </div>
              )}
              {item.opponentMessage && (
                <div className="user-message-my-message-container">
                  <div
                    className="user-message-my-message"
                    onContextMenu={handleContextMenu}
                  >
                    <div className="user-message-my-message-message">
                      {item.opponentMessage}
                    </div>
                    <div className="user-message-my-message-time">
                      {item.time}
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Input field */}
        <div className="user-message-messaging-input">
          <form
            className="user-message-input-container"
            onSubmit={handleSubmit}
          >
            <div className="user-message-input-container">
              <input
                className="user-message-input"
                placeholder="   Type a message..."
                value={userInput} // Bind input value to state
                onChange={handleChange} // Handle input change
              />
              <button type="submit" className="user-message-send-button">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Context menu */}
      {showContextMenu && (
        <div
          className="context-menu"
          style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
          onClick={hideContextMenu}
        >
          <div className="context-menu-option">React</div>
          <div className="context-menu-option">Option 2</div>
        </div>
      )}
    </div>
  );
}

export default Message;
