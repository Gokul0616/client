import React, { useState, useEffect } from "react";
import SignOutIcon from "./Assets/right-arrow.png";
import SignOutIcon2 from "./Assets/right-arrow2.png";
import "./account.css";
import axios from "axios";
import SuggestedFriends from "../Suggested friends/SuggestedFriends";
import NoProfile from "../Usermessages/assets/user.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = ({ userId, isDarkMode }) => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const {
    bio,
    dob,
    email,
    firstname,
    gender,
    lastname,
    id,
    phone_number,
    profileurl,
    userid,
  } = userDetails;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const userEmail = "gokulgokul10203@gmail.com";
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_SERVER_PORT}/api/user/${userId}`
        );
        if (result.data === false) {
          navigate(`/check/${userId}`);
        } else {
          setUserDetails(result.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClick = () => {
    console.log("cliclked");
    // toast("Popup closed!");
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleImageUpload = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const email = e.target[2].value;
    const gender = e.target[3].value;
    const dob = e.target[4].value;
    const phoneNumber = e.target[5].value;
    const bio = e.target[6].value;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("gender", gender);
      formData.append("dob", dob);
      formData.append("phoneNumber", phoneNumber);
      formData.append("bio", bio);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_PORT}/upload/${userId}`,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const userFirstName = response.data.result[0][0].firstname;
      const userLastName = response.data.result[0][0].lastname;
      setUserFirstName(userFirstName);
      setUserLastName(userLastName);

      if (response.data) {
        closePopup();
        setFile("");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="account-container">
      <div className="user-heading-container">
        <div className="user-heading">Account</div>
        <div className="user-settings">
          <img
            className="settings-icon"
            src={isDarkMode ? SignOutIcon2 : SignOutIcon}
            alt="Settings"
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          />
        </div>
      </div>
      <div className="accountinfo-container">
        <div className="accountinfo-user-image">
          <img
            src={profileurl ? profileurl : NoProfile}
            alt="user-img"
            className="account-user-img"
          />

          <div className="accountinfo-user-details">
            <div className="accountinfo-user-name padding-10">
              {userFirstName ? userFirstName : firstname}{" "}
              {userLastName ? userLastName : lastname}
            </div>
            <div className="accountinfo-user-mail padding-10">{email}</div>
          </div>
        </div>
        <div className="accountinfo-edit-button-container">
          <button
            className="accountinfo-edit-button"
            onClick={openPopup}
            style={{ cursor: "pointer" }}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="suggested-friends-heading">Suggested For You</div>
      <SuggestedFriends isDarkMode={isDarkMode} userId={userId} />

      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup-content">
            <div className="popup-heading-edit-profile">Edit Profile</div>
            <button className="popup-close-button" onClick={closePopup}>
              X
            </button>
            <form onSubmit={handleUpload}>
              <input
                type="text"
                placeholder={firstname ? firstname : "First Name"}
              />
              <input
                type="text"
                placeholder={lastname ? lastname : "Last Name"}
              />
              <input type="email" placeholder={userEmail} disabled />
              <select>
                <option value="">{gender}</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input type="date" placeholder="Date of Birth" />
              <input
                type="tel"
                placeholder={phone_number ? phone_number : "number"}
              />
              <textarea placeholder={bio ? bio : "Bio"}></textarea>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
