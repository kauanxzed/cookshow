import { UserPayloadType } from '../../../pages/profile/types/recipe.type'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface likeProps {
  id_receita: string
}

const Like: React.FC<likeProps> = ({ id_receita }) => {
  const [stateFav, setStateFav] = useState<boolean>(false)
  const [payload, setPayload] = useState<string>()
  const [interaction, setInteraction] = useState<boolean>(false)

  const fetchFav = async (userId: string) => {
    const fav = await axios.get('/api/user/' + userId + '/' + id_receita)
    if (fav) {
      setStateFav(true)
    } else {
      setStateFav(false)
    }
  }

  useEffect(() => {
    getPayloadUser().then((payload) => {
      if (payload) {
        setPayload(payload.data.userId)
        fetchFav(payload.data.userId)
      }
    })
    console.log(payload)
    if (payload) {
      axiosInstace
        .get('/api/recipe/' + id_receita + '/user/' + payload + '/interaction')
        .then((res) => {
          console.log(res)
          setInteraction(res ? true : false)
        })
    }
  }, [payload])

  useEffect(() => {
    if (payload) {
      const fetchFav = async () => {
        const fav = await axios.get('/api/user/' + payload + '/' + id_receita)
        if (fav) {
          setStateFav(true)
        } else {
          setStateFav(false)
        }
      }
      fetchFav()
      console.log('com dep de stateFav')
    }
  }, [stateFav])

  const token =
    localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')

  const axiosInstace = axios.create({
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  const handleFavorite = async (id_receita: string) => {
    try {
      if (interaction) {
        axiosInstace.put(
          '/api/recipe/' + id_receita + '/user/' + payload + '/rating',
        )
      } else {
        axiosInstace.post('/api/recipe/' + id_receita + '/rating', {
          id_usuario: payload,
          id_receita,
          favorito: !stateFav,
        })

        setStateFav(!stateFav)
      }
    } catch (error) {
      window.alert('Não foi possivel concluir a ação')
    }
  }

  async function getPayloadUser() {
    try {
      return await axiosInstace.get('/api/auth')
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
