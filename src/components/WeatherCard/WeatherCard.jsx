import React, { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext"; // Import the context

import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  if (!weatherData) {
    return <div className="weather-card">Loading weather data...</div>;
  }

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  // Get currentTemperatureUnit from context (no need to use it as a prop)
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherOption =
    filteredOptions.length > 0
      ? filteredOptions[0]
      : defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

  // Get the temperature based on the current unit (F or C)
  const temp = weatherData.temp?.[currentTemperatureUnit];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp?.toFixed(1)}&deg; {currentTemperatureUnit}
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
