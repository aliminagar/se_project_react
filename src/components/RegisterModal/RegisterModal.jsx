import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitchToLogin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  }, [isOpen]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onRegister) {
      onRegister({ email, password, name, avatar });
    }
  };

  const formIsValid =
    email.trim() && password.trim() && name.trim() && avatar.trim();

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      customButtons={true} // Add this line
    >
      <label htmlFor="register-email" className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL*
        <input
          type="url"
          className="modal__input"
          id="register-avatar"
          placeholder="Avatar URL"
          required
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>

      {/* Custom button container */}
      <div className="modal__button-container">
        <button
          type="submit"
          className="modal__submit-btn"
          disabled={!formIsValid}
        >
          Sign Up
        </button>
        <button
          type="button"
          className="modal__switch-btn"
          onClick={onSwitchToLogin}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}
