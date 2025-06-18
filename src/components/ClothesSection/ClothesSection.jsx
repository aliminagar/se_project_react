import React, { useContext } from "react";
import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  // Filter clothing items to show only items owned by the current user
  const userClothingItems =
    clothingItems?.filter(
      (item) => currentUser && item.owner === currentUser._id
    ) || [];

  return (
    <div className="clothes-section">
      <div className="clothes-section__content">
        <p className="clothes-section__text">Your items</p>
        <button
          className="clothes-section__add-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="cards__list">
        {userClothingItems.length === 0 ? (
          <p className="clothes-section__empty">
            You haven't added any clothes yet.
          </p>
        ) : (
          userClothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id || item.id || item.name}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            );
          })
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
