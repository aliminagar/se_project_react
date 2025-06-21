import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onLogout, onEditProfile }) {
  const { currentUser } = useContext(CurrentUserContext);

  // Create placeholder avatar with first letter of name
  const getAvatarPlaceholder = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  console.log("Sidebar user:", currentUser);

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <div className="sidebar__avatar-container">
          <img
            className="sidebar__avatar"
            src={
              currentUser?.avatar
                ? `${currentUser.avatar}?v=${currentUser._id || Date.now()}`
                : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
            }
            alt="User avatar"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.querySelector(
                ".sidebar__avatar-placeholder"
              ).style.display = "flex";
            }}
          />
          <div
            className="sidebar__avatar-placeholder"
            style={{ display: "none" }}
          >
            {getAvatarPlaceholder(currentUser?.name || currentUser?.email)}
          </div>
        </div>
        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>
      <div className="sidebar__actions">
        <button className="sidebar__edit-btn" onClick={onEditProfile}>
          Change profile data
        </button>
        <button className="sidebar__logout-btn" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
