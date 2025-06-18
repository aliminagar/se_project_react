import "./ItemCard.css";
import openHeart from "../../assets/Open Heart.png";
import closeHeart from "../../assets/CloseHeartDark.png";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  // Check if the item was liked by the current user
  // The likes array should be an array of ids
  const isLiked =
    item.likes && item.likes.some((id) => id === currentUser?._id);

  // Create a variable which you then set in className for the like button
  const itemLikeButtonClassName = `card__like-icon ${
    isLiked ? "card__like-icon_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation(); // prevent triggering card click

    // Call the onCardLike function passed from App.jsx
    onCardLike({ _id: item._id, isLiked });
  };

  return (
    <li className="card" onClick={handleCardClick}>
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {/* Hide like button from unauthorized users */}
        {currentUser && (
          <img
            className={itemLikeButtonClassName}
            src={isLiked ? closeHeart : openHeart}
            alt="like icon"
            onClick={handleLike}
          />
        )}
      </div>
      <img className="card__image" src={item.imageUrl} alt={item.name} />
    </li>
  );
}

export default ItemCard;
