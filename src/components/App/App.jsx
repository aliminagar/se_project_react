import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, deleteCard } from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";

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
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

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

  const handleAddItemModalSubmit = ({ name, imageUrl }) => {
    const duplicate = clothingItems.some(
      (item) => item.name.toLowerCase().trim() === name.toLowerCase().trim()
    );

    if (duplicate) {
      alert("Item with this name already exists!");
      return;
    }

    const itemData = { name, imageUrl, weather: weatherData.type };

    addItem(itemData)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to add item:", error);
        alert("Failed to add item. Please try again.");
      });
  };

  const handleDeleteClick = (card) => {
    setCardToDelete(card);
    setActiveModal("confirm-delete");
  };

  const handleConfirmDelete = () => {
    if (
      !cardToDelete ||
      cardToDelete._id === undefined ||
      cardToDelete._id === null
    ) {
      console.error("No valid _id found for deletion:", cardToDelete);
      return;
    }

    const realId = cardToDelete._id; // ✅ Use only _id!

    setIsLoading(true);
    deleteCard(realId)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== realId));
        setCardToDelete(null);
        closeActiveModal();
      })
      .catch((err) => console.error("Delete failed:", err))
      .finally(() => setIsLoading(false));
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
        const sortedItems = data.sort(
          (a, b) => Number(b._id || b.id) - Number(a._id || a.id)
        );
        setClothingItems(sortedItems);
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

        {activeModal === "preview" && (
          <ItemModal
            activeModal={activeModal}
            card={selectCard}
            closeActiveModal={closeActiveModal}
            onDelete={handleDeleteClick}
          />
        )}

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <DeleteConfirmationModal
          isOpen={activeModal === "confirm-delete"}
          onClose={closeActiveModal}
          onConfirm={handleConfirmDelete}
          isLoading={isLoading}
          cardName={cardToDelete?.name}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
