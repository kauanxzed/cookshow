import React, { useState, useEffect } from 'react'
import UserProfileSimplified from './userProfileSimple'
import axios from 'axios'
import { AxiosResponse } from 'axios'
import { useGetUserPayload } from '@cook-show/hooks'
import { useNavigate } from 'react-router-dom'

function EditProfile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [placeholderName, setPlaceholderName] = useState('Nome')
  const [placeholderEmail, setPlaceholderEmail] = useState('Email')
  const [changeEmail, setChangeEmail] = useState(false)
  const navigate = useNavigate()

  const token =
    localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')

  const axiosInstace = axios.create({
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  const payload = useGetUserPayload()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!payload) return
        const response = await axiosInstace.get(`/api/user/${payload.userId}`)
        const { usuario, email: userEmail } = response.data
        setName(usuario)
        setEmail(userEmail)
      } catch (error) {
        console.error('Error fetching user data: ', error)
      }
    }
    fetchData()
  }, [payload])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    setChangeEmail(true)
  }

  const handleUpdateProfile = async () => {
    try {
      if (!payload) return
      if (changeEmail) {
        await axios.put(`/api/user/${payload.userId}`, {
          usuario: name,
          email,
        })
        navigate('/perfil')
        return
      }
      await axios.put(`/api/user/${payload.userId}`, {
        usuario: name,
      })
      navigate('/perfil')
    } catch (error) {
      alert('Erro ao atualizar perfil. Tente novamente.')
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/3">
        <UserProfileSimplified />
      </div>
      <div className="mt-4 w-full bg-white p-4 md:w-2/3">
        <div className="mb-4 md:mb-0">
          <label htmlFor="name" className="text-lg font-normal text-orange-500">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            placeholder={placeholderName}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4 md:mb-0">
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
            placeholder={placeholderEmail}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4 md:mb-0">
          <hr className="my-4 border-t-2 border-gray-300" />
        </div>
        <div className="mt-8 flex justify-center space-x-4">
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
