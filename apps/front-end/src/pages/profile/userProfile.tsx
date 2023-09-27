import React, { useState } from "react";
import { userProfile } from "../data";
import EditProfile from "./editProfile";
import { useNavigate } from "react-router-dom";


interface UserProfileType {
  profileImage: string;
  name: string;

}

function UserProfile() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const navigate = useNavigate();

  if (isEditing) {
    return <EditProfile />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] bg-gradient-to-r from-orange-500 to-white">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={(userProfile as UserProfileType).profileImage}
          alt={(userProfile as UserProfileType).name}
          className="w-72 h-72 rounded-full object-cover"
        />
        <h2 className="text-xl">{(userProfile as UserProfileType).name}</h2>
        <button
          className="bg-transparent border border-black text-black px-4 py-1 rounded"
          onClick={() => navigate("/profile/edit")} // Navega para a página de edição
        >
          Editar
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
