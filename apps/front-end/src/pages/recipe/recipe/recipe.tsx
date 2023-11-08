import React, { useEffect, useState } from 'react'
import { Modal } from 'flowbite-react'
import RecipeInfo from './recipeInfo'
import RecipeRating from './recipeRating'
import Ingredient from './Ingredient'
import Like from '../../../components/ui/like/like'
import PersonsLiked from '../../../components/ui/personsLiked'
import axios from 'axios'
import Comments from './comments'
import { CommentType } from './types/comment.type'

const token =
  localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')

const axiosInstace = axios.create({
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
})

interface ModalDefaultProps {
  show: boolean | undefined
  setOpenModal: (value: boolean | undefined) => void
  id: string
}

interface typeRecipeIngredients {
  id: number
  nome: string
  portion: number
}

interface typeRecipe {
  id: string
  titulo: string
  descricao: string
  tempo_preparo: string
  dificuldade: string
  imagem: string
  calorias: number
  curtidas: number
  comentarios: CommentType[]
  ingredients: typeRecipeIngredients[]
  rating: number
}

const getRecipeData = async (recipeId: string) => {
  try {
    const recipe = await axios.get('/api/recipe/' + recipeId)
    const recipeLikes = await axios.get(
      '/api/recipe/' + recipeId + '/favoritesQuantity',
    )
    const recipeComments = await axios.get(
      '/api/recipe/' + recipeId + '/comment',
    )

    const recipeRating = await axios.get('/api/recipe/' + recipeId + '/rating')

    if (recipe.status === 200 && recipeLikes.status === 200) {
      const recipeData: typeRecipe = {
        ...recipe.data,
        curtidas: recipeLikes.data,
        comentarios: recipeComments.data,
        rating: recipeRating.data,
      }

      return recipeData
    } else {
      return undefined
    }
  } catch (error) {
    alert('Algo deu errado')
  }
}



const ModalDefault: React.FC<ModalDefaultProps> = ({
  show,
  setOpenModal,
  id,
}) => {
  const [commentsVisible, setCommentsVisible] = useState(true)
  const [showModal, setShowModal] = useState(show)
  const [recipe, setRecipe] = useState<typeRecipe>()

  useEffect(() => {
    try {
      if (show) {
        getRecipeData('f51476c2-c3de-49b2-9396-14a21e1f673a').then((res) => {
          if (res) setRecipe(res)
        })
      }
    } catch (err) {
      alert('Algo deu errado')
    }
  }, [show])

  const postRecipeLikes = async (recipeId: string, id_usuario: string, id_receita: string, favorito: boolean ) => {
    try {
      const recipeLike = await axiosInstace.post('/api/recipe/' + recipeId + '/rating',{
        id_usuario: id_usuario,
        id_receita: id_receita,
        favorito: favorito,
      })      
      
    } catch (error) {
      alert('Não foi possivel concluir a ação')
    }
  }

  function showComments() {
    setCommentsVisible(!commentsVisible)
  }

  const handleCloseModal = () => {
    setShowModal(undefined)
    setOpenModal(undefined) // Define o valor como undefined no pai
  }

  return (
    <Modal show={showModal} onClose={() => handleCloseModal()} size="5xl">
      {recipe ? (
        <Modal.Body className="flex h-[90vh] flex-col justify-between rounded-t-lg bg-white p-0 md:flex-row">
          <div className="h-[90vh] rounded-tl-lg bg-gradient-to-r from-[#FF7A00] p-5">
            <button
              className="self-start text-xl text-black"
              onClick={() => handleCloseModal()}
            >
              X
            </button>
            <div className="align-center flex h-72 w-72 justify-center overflow-hidden rounded-full border border-solid border-[#FF7A00] bg-white">
              <img id="photoRecipe" alt="Foto da receita" src={recipe.imagem} />
            </div>
          </div>
          <div className="flex h-[90vh] w-full flex-col justify-between rounded-tr-lg p-3">
            <div className="flex h-3/5 flex-row">
              <div className="flex w-1/2 flex-col justify-between">
                <div>
                  <h1 className="text-xl text-[#9C4B00]">{recipe.titulo}</h1>
                  <p className="text-xs text-[#999999]">origem</p>
                  <p className='mt-2 font-["Poppins"] text-base text-[#666565]'>
                    TESTE ARRUMAR
                  </p>
                  <div className="mt-2 flex flex-row">
                    <RecipeInfo info={'🕙 ' + recipe.tempo_preparo} />
                    <RecipeInfo info={'🍽️ ' + recipe.dificuldade} />
                    <RecipeInfo info={'🔥 ' + recipe.calorias + ' Kcal'} />
                  </div>
                  <div className="mt-2 flex flex-row items-center">
                    <RecipeRating rating={recipe.rating} />
                    <p className="ml-1">{recipe.rating}</p>
                  </div>
                  <div className="mt-2 flex flex-row flex-wrap">
                    {recipe.ingredients.map((ingredient) => {
                      return <Ingredient name={ingredient.nome} />
                    })}
                  </div>
                </div>
                <div className="flex flex-row">
                  <PersonsLiked personsLiked={recipe.curtidas} />
                </div>
                <div className="flex flex-row">
                  <Like />
                  <p className="ml-2 cursor-pointer" onClick={showComments}>
                    {commentsVisible
                      ? 'Ocultar todos os comentários'
                      : 'Ver todos os comentários'}
                  </p>
                </div>
              </div>
              <div className="flex w-1/2 flex-col items-center rounded-md border-l border-solid border-[#f2f2f2] p-2">
                <h2 className="font-medium">Modo de preparo</h2>
                <div className="scrollbar-hidden overflow-y-auto text-[#666565]">
                  <p>{recipe.descricao}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 h-60 overflow-y-auto">
              {commentsVisible && <Comments comments={recipe.comentarios} />}
            </div>
          </div>
        </Modal.Body>
      ) : (
        <Modal.Body>Carregando...</Modal.Body>
      )}
    </Modal>
  )
}

export default ModalDefault
