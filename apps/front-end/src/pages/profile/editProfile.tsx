import React, { useState, useEffect } from 'react'
import UserProfileSimplified from './userProfileSimple'
import axios from 'axios'
import { AxiosResponse } from 'axios'

interface UserProfileType {
  usuario: string
  email: string
}

function EditProfile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [placeholderName, setPlaceholderName] = useState('Nome')
  const [placeholderEmail, setPlaceholderEmail] = useState('Email')
  const userId = '3739c554-34b0-4e1e-915c-ebf93dfd0559'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`)
        const { usuario, email: userEmail } = response.data
        setName(usuario)
        setEmail(userEmail)
        setPlaceholderName(usuario)
        setPlaceholderEmail(userEmail)
      } catch (error) {
        console.error('Error fetching user data: ', error)
      }
    }
    fetchData()
  }, [])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    if (newName === name) {
      setPlaceholderName(name)
    } else {
      setPlaceholderName('')
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    if (newEmail === email) {
      setPlaceholderEmail(email)
    } else {
      setPlaceholderEmail('')
    }
  }

  const handleUpdateProfile = async () => {
    try {
      const updatedData = {
        usuario: name,
        email: email,
      }
      const response = await axios.put(`/api/user/${userId}`, updatedData)
      console.log(response.data)
      const { usuario, email: userEmail } = response.data
      setName(usuario)
      setEmail(userEmail)
      setPlaceholderName(usuario)
      setPlaceholderEmail(userEmail)
    } catch (error) {
      console.error('Error updating profile: ', error)
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
            onChange={handleNameChange}
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
          <a
            href="/alterar-senha"
            className="text-lg text-orange-500 hover:underline"
          >
            Alterar senha
          </a>
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
