import React, { useState } from 'react'
import { userProfile } from '../data'
import EditProfile from './editProfile'
import { useNavigate } from 'react-router-dom'

interface UserProfileType {
  profileImage: string
  name: string
}

function UserProfile() {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const navigate = useNavigate()

  if (isEditing) {
    return <EditProfile />
  }

  return (
    <div className="flex h-full flex-col bg-gradient-to-r from-orange-500 to-white py-6">
      <div className="mt-0 flex flex-col items-center space-y-4 p-0 md:mt-32 md:p-10">
        <img
          src={(userProfile as UserProfileType).profileImage}
          alt={(userProfile as UserProfileType).name}
          className="relative h-24 w-24 rounded-full object-cover md:h-72 md:w-72"
        />
        <h2 className="text-xl">{(userProfile as UserProfileType).name}</h2>
        <button
          className="rounded border border-black bg-transparent px-4 py-1 text-black "
          onClick={() => navigate('/perfil/editar')} // Navega para a página de edição
        >
          Editar
        </button>
      </div>
    </div>
  )
}

export default UserProfile
