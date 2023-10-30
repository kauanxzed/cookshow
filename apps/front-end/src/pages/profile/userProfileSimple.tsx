import React from 'react'
import { userProfile } from '../data'

interface UserProfileType {
  profileImage: string
  name: string
}

function UserProfileSimplified() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-orange-500 to-white ">
      <div className="flex w-full justify-center">
        <img
          src={(userProfile as UserProfileType).profileImage}
          alt={(userProfile as UserProfileType).name}
          className="-mt-40 h-72 w-72 rounded-full object-cover md:-mt-80 md:h-96 md:w-96"
        />
      </div>
      <div className="mt-8 flex flex-col items-center">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <button className="rounded bg-red-800 px-5 py-2 text-white">
            Remover
          </button>
          <button className="rounded bg-gray-700 px-7 py-2 text-white">
            Alterar
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfileSimplified
