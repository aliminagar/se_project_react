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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteCard,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signup, signin, checkToken } from "../../utils/auth";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

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

  // New state variables for login/register modals
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Add isLoggedIn state for authentication (already exists!)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Add currentUser state for user context
  const [currentUser, setCurrentUser] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectCard(card);
  };

  const handleAddClick = () => {
    // Only allow logged in users to add items
    if (!isLoggedIn) {
      alert("Please log in to add clothing items.");
      return;
    }
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const duplicate = clothingItems.some(
      (item) => item.name.toLowerCase().trim() === name.toLowerCase().trim()
    );

    if (duplicate) {
      alert("Item with this name already exists!");
      return;
    }

    const itemData = { name, imageUrl, weather };
    const token = localStorage.getItem("jwt");

    console.log(
      "Adding item with this data (BEFORE sending to backend):",
      itemData
    );

    addItem(itemData, token)
      .then((newItem) => {
        console.log("Received from backend (AFTER sending):", newItem);
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("❌ Failed to add item:", error);
        alert("Failed to add item. Please try again.");
      });
  };

  const handleDeleteClick = (card) => {
    if (!isLoggedIn) {
      alert("Please log in to delete clothing items.");
      return;
    }
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

    const realId = cardToDelete._id;
    const token = localStorage.getItem("jwt");

    setIsLoading(true);
    deleteCard(realId, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== realId));
        setCardToDelete(null);
        closeActiveModal();
      })
      .catch((err) => console.error("Delete failed:", err))
      .finally(() => setIsLoading(false));
  };

  // Add handleCardLike function
  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!isLiked) {
      addCardLike(_id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      removeCardLike(_id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  // Enhanced registration handler
  const handleRegister = (data) => {
    signup(data)
      .then((response) => {
        console.log("Registration successful:", response);

        if (response.token) {
          localStorage.setItem("jwt", response.token);
        }

        // Set user data in context
        setCurrentUser(response.user || response);
        setIsLoggedIn(true);
        setShowRegister(false);

        console.log("User automatically signed in after registration");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
      });
  };
  // Clean version without emojis
  // Enhanced login handler with detailed debugging
  const handleLogin = (data) => {
    signin(data)
      .then((response) => {
        console.log("=== DEBUG LOGIN RESPONSE ===");
        console.log("Full response:", response);
        console.log("Response keys:", Object.keys(response));
        console.log("response.name:", response.name);
        console.log("response.user:", response.user);
        console.log("response.data:", response.data);
        console.log("response.email:", response.email);
        console.log("============================");

        if (response.token) {
          localStorage.setItem("jwt", response.token);

          // Let's try different ways to get the user data
          const userData = response.user || response.data || response;
          console.log("Setting currentUser to:", userData);

          setCurrentUser(userData);
          setIsLoggedIn(true);
          setShowLogin(false);
          console.log("JWT token stored and user logged in");
        } else {
          throw new Error("No token received from server");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials and try again.");
      });
  };

  // Add logout function
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null); // Clear user data from context
    setIsLoggedIn(false);
    console.log("User logged out, JWT token removed");
  };

  useEffect(() => {
    console.log("🚀 useEffect for weather is running");
    console.log("🛰️ Coordinates:", coordinates, "API key:", APIkey);

    getWeather(coordinates, APIkey)
      .then((data) => {
        console.log("RAW weather data from API:", data);
        const filteredData = filterWeatherData(data);
        console.log("Filtered weather data:", filteredData);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("❌ Error fetching weather data:", error);
      });
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

  // Check for existing token on app load and validate it
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData); // Set user data from token validation
          setIsLoggedIn(true);
          console.log("Token valid, user logged in!", userData);
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          setCurrentUser(null);
          setIsLoggedIn(false);
          console.warn("Invalid token, logged out.");
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLoginClick={() => setShowLogin(true)}
              onRegisterClick={() => setShowRegister(true)}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleAddClick={handleAddClick}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                      onLogout={handleLogout}
                    />
                  </ProtectedRoute>
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
              isLoggedIn={isLoggedIn}
            />
          )}
          {isLoggedIn && (
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
          )}
          {isLoggedIn && (
            <DeleteConfirmationModal
              isOpen={activeModal === "confirm-delete"}
              onClose={closeActiveModal}
              onConfirm={handleConfirmDelete}
              isLoading={isLoading}
              cardName={cardToDelete?.name}
            />
          )}

          <LoginModal
            isOpen={showLogin}
            onClose={() => setShowLogin(false)}
            onLogin={handleLogin}
          />
          <RegisterModal
            isOpen={showRegister}
            onClose={() => setShowRegister(false)}
            onRegister={handleRegister}
          />

          <footer>Developed by Dr. Alireza Minagar – React Test!</footer>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
