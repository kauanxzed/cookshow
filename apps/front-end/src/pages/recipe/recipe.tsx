import React, { useEffect, useState } from 'react'
import { Modal } from 'flowbite-react'
import RecipeInfo from './recipeInfo'
import { Rating } from './recipeRating'
import Ingredient from './Ingredient'
import Like from '../../components/ui/like/like'
import PersonsLiked from '../../components/ui/personsLiked'
import axios from 'axios'
import Comments from './comments'
import { CommentType } from './types/comment.type'

const token =
  localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')

const axiosInstance = axios.create({
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

interface typeUser {
  foto_perfil: string,
  id: string
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
  ingredientNames: string[]
  user: typeUser
}

const RecipeDetails: React.FC<ModalDefaultProps> = ({
  show,
  setOpenModal,
  id,
}) => {
  const [commentsVisible, setCommentsVisible] = useState(true)
  const [showModal, setShowModal] = useState(show)
  const [recipe, setRecipe] = useState<typeRecipe>()
  const [rating, setRating] = useState(0)
  const [ownerName, setOwnerName] = useState("")

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
        const ingredientsPromises = recipe.data.ingredients.map(
          async (el: { ingredient: string }) => {
            const response = await axios.get(
              '/api/ingredient/' + el.ingredient + '/getById',
            );
            return response.data;
          },
        );
  
        const ingredientsData = await Promise.all(ingredientsPromises);
        const ingredientNames = ingredientsData.map((el) => el.nome);
  
        const recipeData: typeRecipe = {
          ...recipe.data,
          curtidas: recipeLikes.data,
          comentarios: recipeComments.data,
          rating: recipeRating.data,
          ingredientNames: ingredientNames, // Adiciona os nomes dos ingredientes ao objeto recipeData
        };
        console.log(recipeData)

        axios.get("/api/user/" + recipeData.user.id).then((data) => setOwnerName(data.data.usuario))
        

        return recipeData;
      } else {
        return undefined
      }
    } catch (error) {
      console.log(error)
      alert('Algo deu errado')
      handleCloseModal()
    }
  }

  useEffect(() => {
    try {
      if (show) {
        getRecipeData(id).then((res) => {
          if (res) {
            setRecipe(res)
          }
        }) 
      }
    } catch (err) {
      alert('Algo deu errado')
      handleCloseModal()
    }
  }, [show, id])

  function showComments() {
    setCommentsVisible(!commentsVisible)
  }

  const handleCloseModal = () => {
    setShowModal(undefined)
    setOpenModal(undefined)
  }

  return (
    <Modal show={showModal} onClose={() => handleCloseModal()} size="5xl">
      {recipe ? (
        <Modal.Body className="flex h-[90vh] flex-col justify-between rounded-t-lg bg-white p-0 md:flex-row">
          <div className="h-[90vh] rounded-tl-lg bg-gradient-to-r from-[#FF7A00] p-5 pt-10 flex items-center justify-center relative md:items-start">
            <button
              className="absolute top-5 left-5 text-xl text-black"
              onClick={() => handleCloseModal()}
            >
              X
            </button>
            <div className="flex items-center h-72 w-72 justify-center overflow-hidden rounded-full border border-solid border-[#FF7A00] bg-white">
              <img id="photoRecipe" alt="Foto da receita" src={recipe.imagem} />
            </div>
          </div>
          <div className="flex h-[90vh] w-full flex-col justify-between rounded-tr-lg p-5">
            <div className="flex h-3/5 flex-row">
              <div className="flex w-1/2 flex-col justify-between">
                <div>
                  <h1 className="text-xl text-[#9C4B00]">{recipe.titulo}</h1>
                  <p className='mt-2 font-["Poppins"] text-base text-[#666565]'>
                    {ownerName}
                  </p>
                  <div className="mt-2 flex flex-row">
                    <RecipeInfo info={'🕙 ' + recipe.tempo_preparo} />
                    <RecipeInfo info={'🍽️ ' + recipe.dificuldade} />
                  </div>
                  <div className="mt-2 flex flex-row flex-wrap">
                    {recipe.ingredientNames.map((ingredientName) => (
                      <Ingredient key={ingredientName} name={ingredientName} />
                    ))}
                  </div>
                  <div className="mt-2 flex flex-row items-center">
                    <Rating
                      id={recipe.id}
                      count={5}
                      value={rating}
                      edit={true}
                      onChange={(value) => setRating(value)}
                      className="flex flex-row"
                    />
                  </div>
                </div>
                <div className="flex flex-row">
                  <PersonsLiked likes={recipe.curtidas} />
                </div>
                <div className="flex flex-row">
                  <Like id_receita={recipe.id} />
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
              {commentsVisible && (
                <Comments comments={recipe.comentarios} recipeId={recipe.id} />
              )}
            </div>
          </div>
        </Modal.Body>
      ) : (
        <Modal.Body>Carregando...</Modal.Body>
      )}
    </Modal>
  )
}

export default RecipeDetails
