import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

function SideBar({ onLogout }) {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">Alireza Minagar</p>
      <button className="sidebar__logout-btn" onClick={onLogout}>
        Sign out
      </button>
    </div>
  );
}

export default SideBar;
