import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '@cook-show/shared/axios'
import { useGetUserPayload } from '@cook-show/hooks'

type UserDataType = {
  username: string
  profileImage: string
  fotoId: string
}

const getUserImage = async (userId: string) => {
  try {
    const res = await axiosInstance.get('/api/user/' + userId)
    return res.data
  } catch (error) {
    alert('usuario nao encontrado')
  }
}

function UserProfile() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<UserDataType>()
  const payload = useGetUserPayload()

  useEffect(() => {
    if (payload) {
      getUserImage(payload.userId).then((data) => {
        setUserData({
          username: data.usuario,
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
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full object-cover md:h-72 md:w-72">
              Adicione uma foto de perfil
            </div>
          )}
          <h2 className="text-xl">{userData.username}</h2>
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
