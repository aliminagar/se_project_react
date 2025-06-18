import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  onLoginClick,
  onRegisterClick,
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });

  // Create placeholder avatar with first letter of name
  const getAvatarPlaceholder = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src={logo} alt="header logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city} -{" "}
          <span className="header__time">{formattedTime}</span>
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />

        {/* Show different content based on user authentication */}
        {currentUser ? (
          // Authorized user view
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              +Add Clothes
            </button>
            <Link to="/profile" className="header__profile-link">
              <p className="header__user-name">
                {currentUser &&
                  (currentUser.name
                    ? currentUser.name
                    : currentUser.email
                    ? currentUser.email
                    : "Loading...")}
              </p>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                alt="header avatar"
                className="header__avatar"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.querySelector(
                    ".header__avatar-placeholder"
                  ).style.display = "flex";
                }}
              />
              <div
                className="header__avatar-placeholder"
                style={{ display: "none" }}
              >
                {getAvatarPlaceholder(currentUser.name || currentUser.email)}
              </div>
            </Link>
          </>
        ) : (
          // Non-authorized user view
          <div className="header__auth-buttons">
            <button className="header__button" onClick={onRegisterClick}>
              Sign Up
            </button>
            <button className="header__button" onClick={onLoginClick}>
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
