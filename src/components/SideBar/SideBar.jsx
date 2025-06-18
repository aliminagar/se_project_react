import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onLogout, onEditProfile }) {
  const { currentUser } = useContext(CurrentUserContext);

  // Always use the clear avatar URL
  const avatarUrl =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face";

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img className="sidebar__avatar" src={avatarUrl} alt="User avatar" />
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
