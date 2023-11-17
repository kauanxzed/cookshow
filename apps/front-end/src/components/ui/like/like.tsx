import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { useGetUserPayload } from '@cook-show/hooks'

interface likeProps {
  id_receita: string
  editedFav?: (value: boolean) => void
}

const token =
  localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')

const axiosInstace = axios.create({
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
})

const Like: React.FC<likeProps> = ({ id_receita, editedFav }) => {
  const [stateFav, setStateFav] = useState<boolean>(false)
  const [interaction, setInteraction] = useState<boolean>(false)
  const payload = useGetUserPayload()

  useEffect(() => {
    if (!payload) return
    const getInteraction = async (id_receita: string, id_usuario: string) => {
      const res = await axiosInstace.get(
        '/api/recipe/' + id_receita + '/user/' + id_usuario + '/interaction',
      )
      setInteraction(res.data ? true : false)
      setStateFav(res.data ? res.data.favorito : false)
    }
    getInteraction(id_receita, payload.userId)
  }, [payload, id_receita])

  const handleFavorite = async (id_receita: string) => {
    try {
      if (!payload) throw new AxiosError('Usuario nao logado')
      if (interaction) {
        await axiosInstace.put(
          '/api/recipe/' + id_receita + '/user/' + payload.userId + '/rating',
          {
            favorito: !stateFav,
          },
        )
      } else {
        await axiosInstace.post('/api/recipe/' + id_receita + '/rating', {
          id_usuario: payload.userId,
          favorito: !stateFav,
        })
      }
      if(editedFav) editedFav(true)
      setStateFav(!stateFav)
    } catch (error) {
      alert(error)
    }
  }

  const favorite = stateFav ? (
    <i className="fa-solid fa-heart fa-xl" style={{ color: '#ff8c00' }}></i>
  ) : (
    <i className="fa-regular fa-heart fa-xl" style={{ color: '#ff8c00' }}></i>
  )

  return (
    <div onClick={() => handleFavorite(id_receita)} className="hidden md:block">
      {favorite}
    </div>
  )
}

export default Like
