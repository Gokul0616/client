import React, { useEffect } from "react";
import User from "./User/user";
import { useParams } from "react-router-dom";
import Message from "./Message/message";
import { ToastContainer } from "react-toastify";
import Account from "./Account/account";
const Chat = ({ isDarkMode, toggleDarkMode }) => {
  const { userId } = useParams();

  return (
    <>
      <User
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        userId={userId}
      />
      <hr className="separator" />
      <Message isDarkMode={isDarkMode} userId={userId} />
      <hr className="separator" />
      <ToastContainer />
      <Account isDarkMode={isDarkMode} userId={userId} />
    </>
  );
};

export default Chat;
