import React from 'react';
import { userProfile } from '../data';

interface UserProfileType {
  profileImage: string;
  name: string;
}

function UserProfileSimplified() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-orange-500 to-white ">
      <div className="w-full flex justify-center">
        <img
          src={(userProfile as UserProfileType).profileImage}
          alt={(userProfile as UserProfileType).name}
          className="w-72 h-72 md:w-96 md:h-96 rounded-full object-cover -mt-40 md:-mt-80"
        />
      </div>
      <div className="flex flex-col items-center mt-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <button className="bg-red-800 text-white px-5 py-2 rounded">
            Remover
          </button>
          <button className="bg-gray-700 text-white px-7 py-2 rounded">
            Alterar
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfileSimplified;
