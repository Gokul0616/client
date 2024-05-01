import React, { useEffect, useState } from "react";
import "./message.css";
import OptionsIcon from "./Assets/more.png";
import UserIcon from "./Assets/user.png";
import OptionsIcon2 from "./Assets/more2.png";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function Message({ userId, currUser, isDarkMode }) {
  const [messageUserDetails, setMessageUserDetails] = useState([]);
  const [messageWarning, setMessageWarning] = useState("   Type a message...");
  const [userMessages, setUserMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    // Fetch user details
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_PORT}/api/user/${currUser}`
        );
        setMessageUserDetails(res.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData(); // Fetch initial user details

    // Polling for new messages every second
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [currUser]);

  useEffect(() => {
    // Fetch user messages
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_PORT}/api/usernewmessage/${userId}/${currUser}`
        );
        // console.log("fetched");
        setUserMessages(res.data);
      } catch (error) {
        console.error("Error fetching user messages:", error);
      }
    };

    fetchMessages(); // Fetch initial user messages

    // Polling for new messages every second
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 1000);

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [userId, currUser]);

  const handleChange = (event) => {
    setUserInput(event.target.value); // Update user input state
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission

    if (userInput.trim() !== "") {
      try {
        const messageId = uuidv4();
        const timestamp = new Date().toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          millisecond: "2-digit",
          hour12: true,
        });
        const result = await axios.post(
          `${process.env.REACT_APP_SERVER_PORT}/api/message/${userId}/${currUser}`,
          { message: userInput, messageId: messageId, timestamp: timestamp }
        );

        if (result.data === "success") {
          const newMessage = {
            message_id: messageId,
            sender_id: userId,
            receiver_id: currUser,
            message_content: userInput,
            timestamp: timestamp,
          };
          setUserMessages([...userMessages, newMessage]);
          setUserInput(""); // Clear the input field after sending the message
          // Emit a new message event via WebSocket
          // socket.emit("newMessage", newMessage);
        } else {
          console.error("Failed to send message:", result.data);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      setMessageWarning("   Please enter something to send a message...");
    }
  };

  const getTimeString = (timestamp) => {
    const [datePart, timePart] = timestamp.split(", ");
    const [time, ampm] = timePart.split(" ");
    const [hours, minutes] = time.split(":");
    let formattedTime = `${hours}:${minutes}`;
    if (ampm) {
      formattedTime += ` ${ampm.toLowerCase()}`;
    }
    return formattedTime;
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    const posX = event.pageX;
    const posY = event.pageY;
    setContextMenuPosition({ x: posX, y: posY });
    setShowContextMenu(true);
  };

  const hideContextMenu = () => {
    setShowContextMenu(false);
  };

  const splitMessageContent = (content) => {
    const chunkSize = 20;
    const chunks = [];
    for (let i = 0; i < content.length; i += chunkSize) {
      chunks.push(content.slice(i, i + chunkSize));
    }
    return chunks.join("\n");
  };
  // console.log(userMessages);

  return (
    <div className="message-container">
      <div className="user-heading-container">
        <div className="user-heading-bio">
          <div className="user-heading-bio-name-container-image">
            <div className="user-message-img-container-message-container">
              <img
                className="user-message-img "
                src={
                  messageUserDetails.profileurl
                    ? messageUserDetails.profileurl
                    : UserIcon
                }
                alt="Profile"
                height={50}
                width={50}
              />
            </div>
            <div className="user-heading-bio-name-container">
              <div className="user-heading-bio-name">
                {messageUserDetails.firstname} {messageUserDetails.lastname}
              </div>
              <div className="user-heading-bio-text">
                {messageUserDetails.bio}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="user-settings">
          <img
            className="settings-icon"
            src={isDarkMode ? OptionsIcon2 : OptionsIcon}
            alt="Settings"
            style={{ cursor: "pointer" }}
          />
        </div> */}
      </div>
      <div
        className="user-message-messaging-container"
        onContextMenu={(event) => event.preventDefault()}
      >
        <div className="user-message-messaging-message">
          {userMessages.map((message) => (
            <React.Fragment key={message.message_id}>
              {/* Assuming each message has a unique message_id */}
              {message.sender_id === userId && (
                <div className="user-message-my-message-container">
                  <div
                    className="user-message-my-message"
                    onContextMenu={handleContextMenu}
                  >
                    <div className="user-message-my-message-message">
                      {splitMessageContent(message.message_content)}
                    </div>
                    <div className="user-message-my-message-time">
                      {getTimeString(message.timestamp)}
                    </div>
                  </div>
                </div>
              )}
              {message.sender_id === currUser && (
                <div className="user-message-opponent-message-container">
                  <div
                    className="user-message-opponent-message"
                    onContextMenu={handleContextMenu}
                  >
                    <div className="user-message-opponent-message-message">
                      {splitMessageContent(message.message_content)}
                    </div>
                    <div className="user-message-opponent-message-time">
                      {getTimeString(message.timestamp)}
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="user-message-messaging-input">
          <form
            className="user-message-input-container"
            onSubmit={handleSubmit}
          >
            <div className="user-message-input-container">
              <input
                className="user-message-input"
                placeholder={messageWarning}
                value={userInput}
                onChange={handleChange}
              />
              <button type="submit" className="user-message-send-button">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
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
