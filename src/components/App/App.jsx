import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, deleteCard } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectCard, setSelectCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [name, setName] = useState("");
  const [link, setLink] = useState(""); // Changed from imageUrl to link
  const [weather, setWeather] = useState("");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleAddItemModalSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", name, link, weather);
    const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
    const itemData = { name, link, weather }; // Changed from imageUrl to link

    addItem(itemData)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        // Reset form fields
        setName("");
        setLink(""); // Changed from setImageUrl
        setWeather("");
        closeActiveModal();
      })
      .catch((error) => {
        console.error(error);
        // If API fails, add item locally
        const newItem = { _id: newId, name, link, weather }; // Changed from imageUrl to link
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      });
  };

  const handleDeleteCard = () => {
    if (!selectCard || !selectCard._id) {
      console.error("No card selected for deleting");
      return;
    }

    deleteCard(selectCard._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectCard._id)
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error(error);
        // If API fails, delete item locally
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectCard._id)
        );
        closeActiveModal();
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleAddClick={handleAddClick}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
          <Footer author="Created by Alireza Minagar" year="2025" />
        </div>

        <ModalWithForm
          buttonText="Add garment"
          titleText="New garment"
          activeModal={activeModal}
          handleCloseClick={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onSubmit={handleAddItemModalSubmit}
          name={name}
          link={link}
          weather={weather}
        >
          <label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label htmlFor="link" className="modal__label">
            Image Link
            <input
              type="text"
              className="modal__input"
              id="link"
              placeholder="Image Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </label>

          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="Hot"
              className="modal__label modal__label__type_radio"
            >
              <input
                id="Hot"
                name="weatherRadioButton"
                type="radio"
                className="modal__radio-input"
                value="hot"
                checked={weather === "hot"}
                onChange={handleWeatherChange}
              />
              Hot
            </label>

            <label
              htmlFor="Warm"
              className="modal__label modal__label__type_radio"
            >
              <input
                id="Warm"
                name="weatherRadioButton"
                type="radio"
                className="modal__radio-input"
                value="warm"
                checked={weather === "warm"}
                onChange={handleWeatherChange}
              />
              Warm
            </label>

            <label
              htmlFor="Cold"
              className="modal__label modal__label__type_radio"
            >
              <input
                id="Cold"
                name="weatherRadioButton"
                type="radio"
                className="modal__radio-input"
                value="cold"
                checked={weather === "cold"}
                onChange={handleWeatherChange}
              />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>

        <ItemModal
          activeModal={activeModal}
          card={selectCard}
          handleCloseClick={closeActiveModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
