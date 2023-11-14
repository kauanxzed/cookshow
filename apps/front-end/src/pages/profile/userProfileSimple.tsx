import { useEffect, useState } from 'react'
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

const deleteUserImage = async (userId: string, fotoId: string) => {
  try {
    await axiosInstance.post('/api/user/deleteFoto', { userId, fotoId })
  } catch (error) {
    alert('não foi possivel deletar a imagem')
  }
}

function UserProfileSimplified() {
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

  const handleImage = () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*'

    fileInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement
      if (target.files && target.files.length > 0) {
        const file = target.files[0] as File
        setFileToBase(file)
      }
    }

    fileInput.click()
  }

  const setFileToBase = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async () => {
      if (payload) {
        await axiosInstance.put('/api/user/' + payload.userId, {
          foto_perfil: reader.result,
        })
        getUserImage(payload.userId).then((data) => {
          setUserData({
            username: payload.username,
            profileImage: data.foto_perfil,
            fotoId: data.foto_id,
          })
        })
      }
    }
  }

  return (
    //eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {userData ? (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-orange-500 to-white">
          <div className="flex w-full justify-center">
            {userData.profileImage && userData.profileImage !== '' ? (
              <img
                src={userData.profileImage}
                alt={userData.username}
                className="relative h-24 w-24 rounded-full object-cover md:h-72 md:w-72"
              />
            ) : (
              <div>Adicione uma foto de perfil</div>
            )}
          </div>
          <div className="mt-8 flex flex-col items-center">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              {userData.profileImage && userData.profileImage !== '' ? (
                <>
                  <button
                    className="rounded bg-red-800 px-5 py-2 text-white"
                    onClick={() => {
                      if (payload) {
                        deleteUserImage(payload.userId, userData.fotoId).then(
                          () =>
                            setUserData({
                              username: payload.username,
                              fotoId: '',
                              profileImage: '',
                            }),
                        )
                      }
                    }}
                  >
                    Remover
                  </button>
                  <button
                    className="rounded bg-gray-700 px-7 py-2 text-white"
                    onClick={handleImage}
                  >
                    Alterar
                  </button>
                </>
              ) : (
                <button
                  className="rounded bg-gray-700 px-7 py-2 text-white"
                  onClick={handleImage}
                >
                  Adicionar
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>carregando...</div>
      )}
    </>
  )
}

export default UserProfileSimplified
