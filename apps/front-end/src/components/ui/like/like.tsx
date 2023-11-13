import { UserPayloadType } from '../../../pages/profile/types/recipe.type'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface likeProps {
  id_receita: string
}

const Like: React.FC<likeProps> = ({id_receita}) => {
  const [stateFav, setStateFav] = useState<boolean>()
  const [payload, setPayload] = useState<UserPayloadType>()

  useEffect(() => {
    getPayloadUser().then((payload) => {
      if (payload) {
        setPayload(payload.data.userId)
      }
    })

    const fetchFav = async () => {
      const fav = await axios.get('/api/user/'+ payload +'/favorite/'+ id_receita)
      if(fav){
        setStateFav(true)
      } else{
        setStateFav(false)
      }
    }
    fetchFav()
    console.log("sem dep")
  }, [])

  useEffect(() => {
    const fetchFav = async () => {
      const fav = await axios.get('/api/user/'+ payload +'/favorite/'+ id_receita)
      if(fav){
        setStateFav(true)
      } else{
        setStateFav(false)
      }
    }
    fetchFav()
    console.log("com dep de stateFav")
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
      if(stateFav) {
        await axiosInstace.post('/api/recipe/' + id_receita + '/rating',{
          id_usuario: payload,
          id_receita,
          favorito: stateFav,
        });
        setStateFav(false)
      } else {
        await axiosInstace.post('/api/recipe/' + id_receita + '/rating',{
          id_usuario: payload,
          id_receita,
          favorito: stateFav,
        });
        setStateFav(true)
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
