import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface likeProps {
  id_receita: string,
  id_usuario: string,
  favorito: boolean
}

const Like: React.FC<likeProps> = ({id_receita, id_usuario, favorito}) => {
  const [stateFav, setStateFav] = useState(false)

  useEffect(() => {
    const fetchFav = async () => {
      const fav = await axios.get('/api/user/'+ id_usuario +'/favorite/'+ id_receita)
      if(fav){
        setStateFav(true)
      } else{
        setStateFav(false)
      }
    }
    fetchFav()
  }, [])

  const token =
  localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')

  const axiosInstace = axios.create({
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  const handleFavorite = async (id_receita: string, id_usuario: string, favorito: boolean ) => {
    try {
      if(stateFav) {
        await axiosInstace.post('/api/recipe/' + id_receita + '/rating',{
          id_usuario,
          id_receita,
          favorito,
        });
        setStateFav(false)
      } else {
        await axiosInstace.post('/api/recipe/' + id_receita + '/rating',{
          id_usuario,
          id_receita,
          favorito,
        });
        setStateFav(true)
      }
    } catch (error) {
      window.alert('Não foi possivel concluir a ação')
    }
  }

  useEffect(() => {
    const fetchFav = async () => {
      const fav = await axios.get('/api/user/'+ id_usuario +'/favorite/'+ id_receita)
      if(fav){
        setStateFav(true)
      } else{
        setStateFav(false)
      }
    }
    fetchFav()
  }, [stateFav])


  const likes = stateFav ? (
    <i className="fa-solid fa-heart fa-xl" style={{ color: '#ff8c00' }}></i>
  ) : (
    <i className="fa-regular fa-heart fa-xl" style={{ color: '#ff8c00' }}></i>
  )

  return (
    <div onClick={() => handleFavorite(id_receita,id_usuario, favorito)} className="hidden md:block">
      {likes}
    </div>
  )
}

export default Like
