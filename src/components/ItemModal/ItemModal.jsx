import "./ItemModal.css";

function ItemModal({ activeModal, card, handleCloseClick }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          onClick={handleCloseClick}
          className="modal__close"
        ></button>
        <img src={card.link} alt="modal image" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
