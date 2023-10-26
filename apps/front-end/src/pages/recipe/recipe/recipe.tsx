import React, { useState, ChangeEvent } from 'react';
import { Button, Modal } from 'flowbite-react';
import RecipeInfo from './recipeInfo';
import RecipePhotoMock from '../../../assets/images/carne.jpg'
import RecipeRating from "./recipeRating"
import Ingredient from './Ingredient';
import Like from '../../../components/ui/like/like';
import Comments from './comments';

const ingredients = [
  {nome: 'carne'},
  {nome: 'miojo'},
  {nome: 'maçã'},
  {nome: 'pera'},
  {nome: 'banana'}
]


const ModalDefault = () => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [commentsVisible, setCommentsVisible] = useState(true);
  const props = { openModal, setOpenModal };
  const recipeMock = {
    recipePhoto: RecipePhotoMock,
    recipeName: "Carne louca",
    recipeAutor: "Rafael",
    recipeOrigin: "ITALIANO",
    recipeTime:"Oh40min",
    recipeDifficulty: "Média",
    recipeKcal: 678,
    recipeRating: 4.8,
    recipeIngredients: [
      {
        ingredientName: "carne",
        ingredientPortion: 200
      },
      {
        ingredientName: "miojo",
        ingredientPortion: 500
      },
      {
        ingredientName: "maça",
        ingredientPortion: 100
      },
      {
        ingredientName: "pera",
        ingredientPortion: 100
      },
      {
        ingredientName: "banana",
        ingredientPortion: 150
      }
    ],
    recipeComments: [
      {
        commentAuthor: "Carlos",
        commentContent: "Bela receita!"
      },
      {
        commentAuthor: "Igor rafael De Souza",
        commentContent: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste"
      },
      {
        commentAuthor: "Matheus",
        commentContent: "uau!"
      },
      {
        commentAuthor: "Thiago",
        commentContent: "incrivel."
      },
    ]
  }

  function showComments() {
    setCommentsVisible(!commentsVisible);
    console.log("teste")
  }

  return (
    <>
      <Button onClick={() => props.setOpenModal('default')} className='text-color-blue-500'>
        Toggle modal
      </Button>
      <Modal
        show={props.openModal === 'default'}
        onClose={() => props.setOpenModal(undefined)}
        size="5xl"
      >
        <Modal.Body className="flex flex-col h-[90vh] p-0 md:flex-row justify-between bg-white rounded-t-lg">
          <div className="bg-gradient-to-r from-[#FF7A00] h-[90vh] p-5 rounded-tl-lg">
              <button
                  className="text-black text-xl self-start"
                  onClick={() => props.setOpenModal(undefined)}
                >
                  X
                </button>
              <div className="rounded-full w-72 h-72 bg-white border-solid border border-[#FF7A00] flex justify-center align-center overflow-hidden">
                <img
                    id="photoRecipe"
                    alt='Foto da receita'
                    src={recipeMock.recipePhoto}
                  /> 
              </div>
            </div>
          <div className="rounded-tr-lg p-3 w-full h-[90vh] flex flex-col justify-between">
            <div>
              <p className='text-xl text-[#9C4B00]'>
                {recipeMock.recipeName}
              </p>
              <p className='text-xs text-[#999999]'> 
              {recipeMock.recipeOrigin}
              </p>
              <p className='font-["Poppins"] mt-2 text-base text-[#666565]'> 
                {recipeMock.recipeAutor}
              </p>
              <div className='flex flex-row'>
                <RecipeInfo info={'🕙 ' + recipeMock.recipeTime}/>
                <RecipeInfo info={'🍽️ ' + recipeMock.recipeDifficulty}/>
                <RecipeInfo info={'🔥 ' + recipeMock.recipeKcal + ' Kcal'}/>
              </div>
              <div className='flex flex-row items-center'>
                <RecipeRating rating={recipeMock.recipeRating}/>
                <p className='ml-1'>{recipeMock.recipeRating}</p>
              </div>
              <div className='flex flex-row'>
                {recipeMock.recipeIngredients.map((ingredient) => {
                  return (
                    <Ingredient name={ingredient.ingredientName}/>
                  )
                })}
              </div>
            </div>
            <div className='flex flex-row'>
                <div className="rounded-full w-6 h-6 bg-white border-solid border border-[#FF7A00]"></div>
                <div className="rounded-full w-6 h-6 bg-white border-solid border border-[#FF7A00]"></div>
                <div className="rounded-full w-6 h-6 bg-white border-solid border border-[#FF7A00]"></div>
                <div className="rounded-full w-6 h-6 bg-white border-solid border border-[#FF7A00]"></div>
            </div>
            <div className='flex flex-row'>
              <Like/>
              <p className='cursor-pointer ml-2' onClick={showComments}>{commentsVisible ? "Ocultar todos os comentários" : "Ver todos os comentários"}</p>
            </div>
            <div className='h-36 overflow-y-scroll'>
                {commentsVisible && (
                  <Comments comments={recipeMock.recipeComments}/>
                )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalDefault;
