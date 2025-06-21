import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import "./LoginModal.css";

export default function LoginModal({ isOpen, onClose, onLogin, onOpenSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isOpen]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin({ email, password });
    }
  };

  const formIsValid = email.trim() && password.trim();

  return (
    <ModalWithForm
      title="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      customButtons={true}
    >
      <label htmlFor="login-email" className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </label>

      {/* Both buttons in the same container */}
      <div className="modal__actions">
        <button
          type="submit"
          className="modal__button"
          disabled={!formIsValid}
          onClick={handleSubmit}
        >
          Log in
        </button>
        <span>or</span>
        <button
          type="button"
          className="modal__signup-btn"
          onClick={onOpenSignUp}
        >
          Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}
