import React, { useContext } from "react";
import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, card, closeActiveModal, onDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  // Check if the current user is the owner of the current clothing item
  const isOwn = currentUser && card.owner === currentUser._id;

  const handleDeleteClick = () => {
    onDelete(card);
  };

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__container modal__container_type_image">
        <button
          className="modal__close"
          type="button"
          onClick={closeActiveModal}
          aria-label="Close"
        >
          &#x2715;
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {/* Only show delete button if user owns the item */}
          {isOwn && (
            <button
              className="modal__delete-button"
              type="button"
              onClick={handleDeleteClick}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
