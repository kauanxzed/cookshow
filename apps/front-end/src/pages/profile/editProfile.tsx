import React from 'react'
import UserProfileSimplified from './userProfileSimple'
import { userProfile } from '../data'

interface UserProfileType {
  name: string
  email: string
}

function EditProfile() {
  const { name, email } = userProfile as UserProfileType

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/3">
        <UserProfileSimplified />
      </div>
      <div className="mt-4 w-full bg-white p-4 md:w-2/3">
        <div className="mb-4">
          <p className="mb-2 block text-lg font-normal">
            <span className="text-orange-500">Nome:</span> {name}
          </p>
        </div>
        <div className="mb-4">
          <hr className="my-2 border-t-2 border-gray-300" />
          <p className="mb-2 mt-4 block text-lg font-normal">
            <span className="text-orange-500">Email:</span> {email}
          </p>
        </div>
        <div className="mb-4">
          <hr className="my-4 border-t-2 border-gray-300" />
          <a
            href="/alterar-senha"
            className="text-lg text-orange-500 hover:underline"
          >
            Alterar senha
          </a>
          <hr className="my-4 border-t-2 border-gray-300" />
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <button className="rounded bg-red-800 px-4 py-2 text-white">
            Cancelar
          </button>
          <button className="rounded bg-gray-700 px-5 py-2 text-white">
            Concluir
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
