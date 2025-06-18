import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import "./profile.css";
import { useState } from "react";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  onLogout,
  onCardLike,
  onUpdateProfile, // Add this prop
}) {
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleUpdateProfile = (profileData) => {
    onUpdateProfile(profileData); // Use the function from App.jsx
    setShowEditProfile(false); // Close the modal
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onLogout={onLogout} onEditProfile={handleEditProfile} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          onCardLike={onCardLike}
        />
      </section>

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
}

export default Profile;
