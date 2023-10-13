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
    <div className="flex">
      <div className="w-1/3">
        <UserProfileSimplified />
      </div>
      <div className="flex-1 p-4 bg-white ml-0 mt-32">
        <div className="mb-4 mt-">
          <p className="block text-lg font-normal mb-2">
            <span className="text-orange-500">Nome:</span> {name}
          </p>
        </div>
        <div className="mb-4 mt-8">
          <hr className="border-t-2 border-gray-300 my-2" />
          <p className="block text-lg font-normal mb-2 mt-6">
            <span className="text-orange-500">Email:</span> {email}
          </p>
        </div>
        <div className="mb-4 mt-8">
          <hr className="border-t-2 border-gray-300 my-6" />
          <a
            href="/alterar-senha"
            className="text-orange-500 hover:underline text-lg"
          >
            Alterar senha
          </a>
          <hr className="border-t-2 border-gray-300 my-6 " />
        </div>
        <div className="flex justify-center space-x-4 mt-20 mr-96">
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
