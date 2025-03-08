import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
// Import the context (if it exists elsewhere)
// import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
// Or create it if it doesn't exist
import React, { useContext } from "react";

// If the context doesn't exist elsewhere, create it here
const CurrentTemperatureUnitContext = React.createContext("F"); // Default to Fahrenheit

function WeatherCard({ weatherData }) {
  // Use the context (comment this out if you're not using context yet)
  // const currentTemperatureUnit = useContext(CurrentTemperatureUnitContext);

  // For now, let's use a simple approach without context
  const currentTemperatureUnit = "F"; // Hardcode to Fahrenheit per requirements

  if (!weatherData) {
    return <div className="weather-card">Loading weather data...</div>;
  }

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOption =
    filteredOptions.length > 0
      ? filteredOptions[0]
      : defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}&deg; {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url || ""}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"} time ${
          weatherOption?.condition || "unknown"
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
