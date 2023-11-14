import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserPayloadType } from './types/recipe.type'

type UserDataType = {
  username: string
  profileImage: string
  fotoId: string
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

const getUserPayload = async () => {
  try {
    const res = await axiosInstance.get('/api/auth')
    return res.data as UserPayloadType
  } catch (error) {
    alert('usuario não logado')
  }
}

const getUserImage = async (userId: string) => {
  try {
    const res = await axiosInstance.get('/api/user/' + userId)
    const user = res.data
    return user
  } catch (error) {
    alert('usuario nao encontrado')
  }
}
interface UserProfileProps {
  userId: string | undefined
  username: string | undefined
}

function UserProfile(props: UserProfileProps) {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<UserDataType>()
  const [payload, setPayload] = useState<UserPayloadType>()

  useEffect(() => {
    getUserPayload().then((data) => {
      setPayload(data)
    })
  }, [])

  useEffect(() => {
    if (payload) {
      getUserImage(payload.userId).then((data) => {
        setUserData({
          username: payload.username,
          profileImage: data.foto_perfil,
          fotoId: data.foto_id,
        })
      })
    }
  }, [payload])

  return (
    <div className="flex h-full flex-col bg-gradient-to-r from-orange-500 to-white py-6">
      {userData ? (
        <div className="mt-0 flex flex-col items-center space-y-4 p-0 md:mt-32 md:p-10">
          {userData.profileImage !== '' ? (
            <img
              src={userData.profileImage}
              alt={userData.username}
              className="relative h-24 w-24 rounded-full object-cover md:h-72 md:w-72"
            />
          ) : (
            <div>Adicione uma foto de perfil</div>
          )}
          <h2 className="text-xl">{props.username}</h2>
          <button
            className="rounded border border-black bg-transparent px-4 py-1 text-black "
            onClick={() => navigate('/perfil/editar')}
          >
            Editar
          </button>
        </div>
      ) : (
        <div>carregando...</div>
      )}
    </div>
  )
}

export default UserProfile
