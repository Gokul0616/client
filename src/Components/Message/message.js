import React, { useState } from "react";
import "./message.css";
import OptionsIcon from "./Assets/more.png";
import OptionsIcon2 from "./Assets/more2.png";

function Message({ isDarkMode }) {
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showContextMenu, setShowContextMenu] = useState(false);
  const Name = "{Name}";

  const handleClick = () => {
    console.log("clicked");
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

  // Event handler for hiding the context menu
  const hideContextMenu = () => {
    setShowContextMenu(false);
  };
  const bio = "This is your bio messages";
  const truncatedMessage = bio.slice(0, 63).trim();

  return (
    <div className="message-container">
      <div className="user-heading-container">
        <div className="user-heading-bio">
          <div className="user-heading-bio-name">{Name}</div>
          <div className="user-heading-bio-text">{truncatedMessage}</div>
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
          <div className="user-message-input-container">
            <input
              className="user-message-input"
              placeholder="   Type a message..."
            />
            <button className="user-message-send-button" onClick={handleClick}>
              Send
            </button>
          </div>
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
