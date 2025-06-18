import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  name,
  link,
  weather,
  customButtons = false, // Add this prop
}) {
  // Check if all required fields are filled
  const isFormValid = name && link && weather;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close"
        >
          &times; {/* This is the X */}
        </button>
        <h2 className="modal__title">{title}</h2>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          {/* Only show default button if customButtons is false */}
          {!customButtons && (
            <button
              type="submit"
              className={`modal__submit ${
                isFormValid ? "modal__submit_active" : ""
              }`}
            >
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
