import React, { useState, ChangeEvent } from 'react'
import { Button, Modal } from 'flowbite-react'
import RecipeInfo from './recipeInfo'
import RecipePhotoMock from '../../../assets/images/carne.jpg'
import RecipeRating from './recipeRating'
import Ingredient from './Ingredient'
import Like from '../../../components/ui/like/like'
import Comments from './comments'
import PersonsLiked from '../../../components/ui/personsLiked'

const ingredients = [
  { nome: 'carne' },
  { nome: 'miojo' },
  { nome: 'maçã' },
  { nome: 'pera' },
  { nome: 'banana' },
]

const ModalDefault = () => {
  const [openModal, setOpenModal] = useState<string | undefined>()
  const [commentsVisible, setCommentsVisible] = useState(true)
  const props = { openModal, setOpenModal }
  const recipeMock = {
    recipePhoto: RecipePhotoMock,
    recipeName: 'Carne louca',
    recipeAutor: 'Rafael',
    recipeOrigin: 'ITALIANO',
    recipeTime: 'Oh40min',
    recipeDifficulty: 'Média',
    recipeKcal: 678,
    recipeRating: 4.8,
    recipeIngredients: [
      {
        ingredientName: 'carne',
        ingredientPortion: 200,
      },
      {
        ingredientName: 'miojo',
        ingredientPortion: 500,
      },
      {
        ingredientName: 'maça',
        ingredientPortion: 100,
      },
      {
        ingredientName: 'pera',
        ingredientPortion: 100,
      },
      {
        ingredientName: 'banana',
        ingredientPortion: 150,
      },
      {
        ingredientName: 'banana',
        ingredientPortion: 150,
      },
      {
        ingredientName: 'banana',
        ingredientPortion: 150,
      },
      {
        ingredientName: 'banana',
        ingredientPortion: 150,
      },
    ],
    recipeComments: [
      {
        commentAuthor: 'Carlos',
        commentContent: 'Bela receita!',
      },
      {
        commentAuthor: 'Igor rafael De Souza',
        commentContent:
          'teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste',
      },
      {
        commentAuthor: 'Matheus',
        commentContent: 'uau!',
      },
      {
        commentAuthor: 'Thiago',
        commentContent: 'incrivel.',
      },
    ],
    personsLiked: 80,
    recipeMode:
      'modo de preparo da receita ... / modo de preparo da receita ... /modo de preparo da receita ... / modo de preparo da receita ... /modo de preparo da receita ... / modo de preparo da receita ... /modo de preparo da receita ... / modo de preparo da receita ... /',
  }

  function showComments() {
    setCommentsVisible(!commentsVisible)
    console.log('teste')
  }

  return (
    <>
      <Button
        onClick={() => props.setOpenModal('default')}
        className="text-color-blue-500"
      >
        Toggle modal
      </Button>
      <Modal
        show={props.openModal === 'default'}
        onClose={() => props.setOpenModal(undefined)}
        size="5xl"
      >
        <Modal.Body className="flex h-[90vh] flex-col justify-between rounded-t-lg bg-white p-0 md:flex-row">
          <div className="h-[90vh] rounded-tl-lg bg-gradient-to-r from-[#FF7A00] p-5">
            <button
              className="self-start text-xl text-black"
              onClick={() => props.setOpenModal(undefined)}
            >
              X
            </button>
            <div className="align-center flex h-72 w-72 justify-center overflow-hidden rounded-full border border-solid border-[#FF7A00] bg-white">
              <img
                id="photoRecipe"
                alt="Foto da receita"
                src={recipeMock.recipePhoto}
              />
            </div>
          </div>
          <div className="flex h-[90vh] w-full flex-col justify-between rounded-tr-lg p-3">
            <div className="flex h-3/5 flex-row">
              <div className="flex w-1/2 flex-col justify-between">
                <div>
                  <h1 className="text-xl text-[#9C4B00]">
                    {recipeMock.recipeName}
                  </h1>
                  <p className="text-xs text-[#999999]">
                    {recipeMock.recipeOrigin}
                  </p>
                  <p className='mt-2 font-["Poppins"] text-base text-[#666565]'>
                    {recipeMock.recipeAutor}
                  </p>
                  <div className="mt-2 flex flex-row">
                    <RecipeInfo info={'🕙 ' + recipeMock.recipeTime} />
                    <RecipeInfo info={'🍽️ ' + recipeMock.recipeDifficulty} />
                    <RecipeInfo
                      info={'🔥 ' + recipeMock.recipeKcal + ' Kcal'}
                    />
                  </div>
                  <div className="mt-2 flex flex-row items-center">
                    <RecipeRating rating={recipeMock.recipeRating} />
                    <p className="ml-1">{recipeMock.recipeRating}</p>
                  </div>
                  <div className="mt-2 flex flex-row flex-wrap">
                    {recipeMock.recipeIngredients.map((ingredient) => {
                      return <Ingredient name={ingredient.ingredientName} />
                    })}
                  </div>
                </div>
                <div className="flex flex-row">
                  <PersonsLiked personsLiked={recipeMock.personsLiked} />
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
                    {recipeMock.recipeMode}
                    {recipeMock.recipeMode}
                    {recipeMock.recipeMode}
                    {recipeMock.recipeMode}
                    {recipeMock.recipeMode}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 h-60 overflow-y-auto">
              {commentsVisible && (
                <Comments comments={recipeMock.recipeComments} />
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalDefault
