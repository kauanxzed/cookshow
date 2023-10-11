import React from 'react';
import { userProfile } from '../data';

interface UserProfileType {
  profileImage: string;
  name: string;
}

function UserProfileSimplified() {
  return (
    <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-r from-orange-500 to-white">
      <img
        src={(userProfile as UserProfileType).profileImage}
        alt={(userProfile as UserProfileType).name}
        className="w-72 h-72 rounded-full object-cover mb-4"
      />
      <div className="flex space-x-4">
        <button className="bg-red-800 text-white px-5 py-2 rounded">
          Remover
        </button>
        <button className="bg-gray-700 text-white px-7 py-2 rounded">
          Alterar
        </button>
      </div>
    </div>
  );
}

export default UserProfileSimplified;
