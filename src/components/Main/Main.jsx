import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature = weatherData.temp[currentTemperatureUnit]?.toFixed(1); // Rounds to 1 decimal

  return (
    <main>
      <WeatherCard
        weatherData={weatherData}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <section className="cards">
        <p className="cards__text">
          Today is {temperature}°{currentTemperatureUnit} / You may want to
          wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
