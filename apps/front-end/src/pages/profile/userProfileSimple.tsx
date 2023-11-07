import React from 'react'
import { userProfile } from '../data'
import axios from 'axios'

interface UserProfileType {
  profileImage: string
  name: string
}

const token =
  localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
})

function UserProfileSimplified() {
  const updateUserProfileImage = (newImageURL: string) => {
    console.log('Atualize a imagem de perfil com', newImageURL)
  }

  const handleUploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await axiosInstance.post<{ fileName: string }>(
        'http://localhost:3000/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      console.log('File uploaded successfully', response.data)
      // Atualize a imagem de perfil após o upload bem-sucedido, se necessário
      updateUserProfileImage(
        `http://localhost:3000/uploads/${response.data.fileName}`,
      )
    } catch (error) {
      console.error('Error uploading file', error)
    }
  }

  const handleAlterarFoto = () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*'
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement
      if (target.files && target.files.length > 0) {
        const file = target.files[0] as File // Adicione 'as File' aqui
        handleUploadFile(file)
      }
    }
    fileInput.click()
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-orange-500 to-white">
      <div className="flex w-full justify-center">
        <img
          src={(userProfile as UserProfileType).profileImage}
          alt={(userProfile as UserProfileType).name}
          className="relative h-24 w-24 rounded-full object-cover md:h-72 md:w-72"
        />
      </div>
      <div className="mt-8 flex flex-col items-center">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <button className="rounded bg-red-800 px-5 py-2 text-white">
            Remover
          </button>
          <button
            className="rounded bg-gray-700 px-7 py-2 text-white"
            onClick={handleAlterarFoto}
          >
            Alterar
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfileSimplified
