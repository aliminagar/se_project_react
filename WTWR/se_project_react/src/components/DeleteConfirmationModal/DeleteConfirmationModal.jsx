import closeButton from "../../assets/close.svg";
import "./DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_confirm">
        <button
          type="button"
          onClick={onClose}
          className="modal__close"
          disabled={isLoading}
        ></button>
        <div className="modal__confirm-content">
          <p className="modal__confirm-message">
            Are you sure you want to delete this item?
            <br />
            This action is irreversible.
          </p>
          <div className="modal__confirm-buttons">
            <button
              type="button"
              onClick={onConfirm}
              className="modal__confirm-button modal__confirm-button_type_delete"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Yes, delete item"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="modal__confirm-button modal__confirm-button_type_cancel"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
