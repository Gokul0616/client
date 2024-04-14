// App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./Components";
import LandingPage from "./Components/Landing page/LandingPage";
import Signin from "./Components/Auth/Signin/signin";
import Signup from "./Components/Auth/Signup/signup";
import Resetpassword from "./Components/Auth/Reset-password/resetpassword";
import InvalidUrlPage from "./Components/InvalidUrlPage";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Function to toggle the theme
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Function to check system preference and set the initial theme
  const setInitialTheme = () => {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDarkMode);
  };

  // useEffect hook to set initial theme on component mount
  useEffect(() => {
    setInitialTheme();

    // Check if the user is accessing from a mobile device
    const userAgent = navigator.userAgent.toLowerCase();
    if (
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent
      )
    ) {
      setIsMobile(true);
    }
  }, []);

  // Render different content based on whether the user is accessing from a mobile device
  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      {" "}
      {isMobile ? (
        <div>
          <h1>This website is only accessible on desktop devices.</h1>
          <p>Please access it from a desktop browser to use all features.</p>
        </div>
      ) : (
        <Router>
          <Routes>
            <Route
              path="/chat/:userId"
              element={
                <Chat isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              }
            />
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />{" "}
            <Route path="/reset-password" element={<Resetpassword />} />
            <Route path="/check/:id" element={<InvalidUrlPage />} />
            <Route path="*" element={<InvalidUrlPage />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
