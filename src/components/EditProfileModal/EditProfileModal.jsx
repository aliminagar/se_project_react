import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function EditProfileModal({ isOpen, onClose, onUpdateProfile }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile({ name, avatar });
    }
  };

  const formIsValid = name.trim() && avatar.trim();

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!formIsValid}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="edit-avatar" className="modal__label">
        Avatar URL*
        <input
          type="url"
          className="modal__input"
          id="edit-avatar"
          placeholder="Avatar URL"
          required
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}
