import "./ItemModal.css";
import closeButton from "../../assets/Union.png";
import useModalClose from "../../hooks/useModalClose.js";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function ItemModal({ activeModal, card, closeActiveModal, onDelete }) {
  useModalClose(activeModal === "preview", closeActiveModal);
  const { currentUser } = useContext(CurrentUserContext) || {};

  const isOwn =
    currentUser && card && card.owner ? card.owner === currentUser._id : true; // TEMP: always show delete for now

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          onClick={closeActiveModal}
          className="modal__close"
        ></button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <div className="modal__footer-top">
            <h2 className="modal__caption">{card.name}</h2>
            {isOwn && (
              <button
                type="button"
                className="modal__delete-button"
                onClick={() => {
                  closeActiveModal();
                  onDelete(card);
                }}
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
