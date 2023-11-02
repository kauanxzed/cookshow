import React, { useEffect, useState, ChangeEvent } from 'react'
import { Button, Modal } from 'flowbite-react'
import RecipeInfo from './recipeInfo'
import RecipePhotoMock from '../../../assets/images/carne.jpg'
import RecipeRating from "./recipeRating"
import Ingredient from './Ingredient';
import Like from '../../../components/ui/like/like';
import Comments from './comments';
import PersonsLiked from '../../../components/ui/personsLiked';
import axios from 'axios'

const ingredients = [
  { nome: 'carne' },
  { nome: 'miojo' },
  { nome: 'maçã' },
  { nome: 'pera' },
  { nome: 'banana' },
]

interface ModalDefaultProps {
  show: boolean | undefined;
  setOpenModal: (value: boolean | undefined) => void;
  id: string;
}

const ModalDefault: React.FC<ModalDefaultProps> = ({show, setOpenModal, id }) => {
  const [commentsVisible, setCommentsVisible] = useState(true)
  const [showModal, setShowModal] = useState(show)
  const [recipe, setRecipe] = useState<typeRecipe>()
  const [recipeIngredients, setRecipeIngredients] = useState<typeRecipeIngredients[]>()
  const [recipeComments, setRecipeComments] = useState<typeRecipeComments[]>()

  interface typeRecipe {
    id: number,
    titulo: string,
    descricao: string,
    tempo_preparo:string,
    dificuldade:string,
    imagem:string,
    calorias:number,
    curtidas:number,
    userId:number
  }

  interface typeRecipeIngredients {
    id: number,
    nome: string,
    portion: number
  }

  interface typeRecipeComments {
    id:number,
    comentarios: string
  }


  useEffect(() => {
    const urlRecipe = "/api/recipe/"+{id}
    try {
      axios.get(urlRecipe)
      .then(response => {setRecipe(response.data)})

      const urlRecipeIngredients = '/api/recipe/'+recipe?.id+'/ingredient'
      axios.get(urlRecipeIngredients)
      .then(response => {setRecipeIngredients(response.data)})

      const urlGetRecipeComments = '/api/recipe/'+recipe?.id+'/comments'
      axios.get(urlGetRecipeComments)
      .then(response => {setRecipeComments(response.data)})

    }
    catch (err) {
      console.error(err);
    }

  }, [])

  useEffect(() => {
    try {
    const urlPostRecipeComments ='/api/recipe/'+recipe?.id+'/comments'
      axios.post(urlPostRecipeComments, {Comments: recipeComments},
              {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
              },
            )
            .then()
    }
    catch (err) {
    console.error(err);
    }
      
  }, []) 
  
  function showComments() {
    setCommentsVisible(!commentsVisible)
  }

  const handleCloseModal = () => {
    console.log("fecha")
    setShowModal(undefined)
    setOpenModal(undefined); // Define o valor como undefined no pai
  };

  return (
      <Modal
        show={showModal}
        onClose={() => handleCloseModal()}
        size="5xl"
      >
        <Modal.Body className="flex h-[90vh] flex-col justify-between rounded-t-lg bg-white p-0 md:flex-row">
          <div className="h-[90vh] rounded-tl-lg bg-gradient-to-r from-[#FF7A00] p-5">
            <button
              className="self-start text-xl text-black"
              onClick={() =>  handleCloseModal()}
            >
              X
            </button>
            <div className="align-center flex h-72 w-72 justify-center overflow-hidden rounded-full border border-solid border-[#FF7A00] bg-white">
              <img
                id="photoRecipe"
                alt="Foto da receita"
                src={recipe?.imagem}
              />
            </div>
          </div>
          <div className="flex h-[90vh] w-full flex-col justify-between rounded-tr-lg p-3">
            <div className="flex h-3/5 flex-row">
              <div className="flex w-1/2 flex-col justify-between">
                <div>
                  <h1 className="text-xl text-[#9C4B00]">
                    {recipe?.titulo}
                  </h1>
                  <p className="text-xs text-[#999999]">
                    origem
                  </p>
                  <p className='mt-2 font-["Poppins"] text-base text-[#666565]'>
                    {recipe?.userId}
                  </p>
                  <div className="mt-2 flex flex-row">
                    <RecipeInfo info={'🕙 ' + recipe?.tempo_preparo} />
                    <RecipeInfo info={'🍽️ ' + recipe?.dificuldade} />
                    <RecipeInfo
                      info={'🔥 ' + recipe?.calorias + ' Kcal'}
                    />
                  </div>
                  <div className="mt-2 flex flex-row items-center">
                    <RecipeRating rating={4.8} />
                    <p className="ml-1">{4.8}</p>
                  </div>
                  <div className="mt-2 flex flex-row flex-wrap">
                    {recipeIngredients?.map((ingredient) => {
                      return <Ingredient name={ingredient.nome} />
                    })}
                  </div>
                </div>
                <div className='flex flex-row'>
                  <PersonsLiked personsLiked={recipe?.curtidas}/>
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
                  <p>
                    {recipe?.descricao}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 h-60 overflow-y-auto">
              {commentsVisible && (
                <Comments comments={recipeComments?.comentarios} />
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
  )
}

export default ModalDefault
