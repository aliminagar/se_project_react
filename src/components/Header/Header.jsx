import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the clock every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  // Format date (Month Day)
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Format time (HH:MM:SS AM/PM with Time Zone)
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });

  return (
    <header className="header">
      <img src={logo} alt="header logo" className="header__logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city} -{" "}
        <span className="header__time">{formattedTime}</span>
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        +Add Clothes
      </button>
      <div className="header__user">
        <p className="header__user-name">Terrence Tegegne</p>
        <img src={avatar} alt="header avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
