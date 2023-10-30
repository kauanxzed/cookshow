import React, { useState } from 'react';
import { userProfile } from '../data';
import EditProfile from './editProfile';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex flex-col h-full bg-gradient-to-r from-orange-500 to-white py-6">
      <div className="flex flex-col items-center space-y-4 mt-0 p-0 md:p-10 md:mt-32">
        <img
          src={(userProfile as UserProfileType).profileImage}
          alt={(userProfile as UserProfileType).name}
          className="w-24 h-24 md:w-72 md:h-72 rounded-full object-cover relative"
        />
        <h2 className="text-xl">{(userProfile as UserProfileType).name}</h2>
        <button
          className="bg-transparent border border-black text-black px-4 py-1 rounded "
          onClick={() => navigate('/perfil/editar')} // Navega para a página de edição
        >
          Editar
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
