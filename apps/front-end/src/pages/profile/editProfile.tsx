import React, { useState } from 'react'
import UserProfileSimplified from './userProfileSimple'
import { userProfile } from '../data'
import axios from 'axios'

interface UserProfileType {
  name: string
  email: string
}

function EditProfile() {
  const { name: initialName, email: initialEmail } =
    userProfile as UserProfileType

  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put('api/user/${userId}', { name, email })
      console.log(response.data)
    } catch (error) {
      console.error('Error updating profile: ', error)
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="h-full w-full md:w-1/3">
        <UserProfileSimplified />
      </div>
      <div className="mt-4 h-full w-full bg-white p-4 md:w-2/3">
        <div className="mb-4">
          <label htmlFor="name" className="text-lg font-normal text-orange-500">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <hr className="my-2 border-t-2 border-gray-300" />
          <label
            htmlFor="email"
            className="text-lg font-normal text-orange-500"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
          />
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
          <button
            onClick={handleUpdateProfile}
            className="rounded bg-gray-700 px-5 py-2 text-white"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
