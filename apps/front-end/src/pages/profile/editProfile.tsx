import React from 'react';
import UserProfileSimplified from './userProfileSimple';
import { userProfile } from '../data';

interface UserProfileType {
  name: string;
  email: string;
}

function EditProfile() {
  const { name, email } = userProfile as UserProfileType;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/3">
        <UserProfileSimplified />
      </div>
      <div className="w-full md:w-2/3 p-4 bg-white mt-4">
        <div className="mb-4">
          <p className="block text-lg font-normal mb-2">
            <span className="text-orange-500">Nome:</span> {name}
          </p>
        </div>
        <div className="mb-4">
          <hr className="border-t-2 border-gray-300 my-2" />
          <p className="block text-lg font-normal mb-2 mt-4">
            <span className="text-orange-500">Email:</span> {email}
          </p>
        </div>
        <div className="mb-4">
          <hr className="border-t-2 border-gray-300 my-4" />
          <a
            href="/alterar-senha"
            className="text-orange-500 hover:underline text-lg"
          >
            Alterar senha
          </a>
          <hr className="border-t-2 border-gray-300 my-4" />
        </div>
        <div className="flex justify-center space-x-4 mt-8">
          <button className="bg-red-800 text-white px-4 py-2 rounded">
            Cancelar
          </button>
          <button className="bg-gray-700 text-white px-5 py-2 rounded">
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
