import "./ItemCard.css";
import openHeart from "../../assets/Open Heart.png";
import closeHeart from "../../assets/CloseHeartDark.png";
import { useState } from "react";

function ItemCard({ item, onCardClick }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const toggleLike = (e) => {
    e.stopPropagation(); // prevent triggering card click
    setIsLiked((prev) => !prev);
  };

  return (
    <li className="card" onClick={handleCardClick}>
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        <img
          className="card__like-icon"
          src={isLiked ? closeHeart : openHeart}
          alt="like icon"
          onClick={toggleLike}
        />
      </div>
      <img className="card__image" src={item.imageUrl} alt={item.name} />
    </li>
  );
}

export default ItemCard;
