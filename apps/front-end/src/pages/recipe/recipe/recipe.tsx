import React, { useState, ChangeEvent } from 'react';
import { Button, Modal } from 'flowbite-react';
import RecipeInfo from './recipeInfo';
import RecipePhotoMock from '../../../assets/images/carne.jpg'
import RecipeRating from "./recipeRating"
import Ingredient from './Ingredient';
import Like from '../../../components/ui/like/like';
import Comments from './comments';
import PersonLiked from '../../../components/ui/personLiked';
import person1 from "../../../assets/images/person1.png"
import person2 from "../../../assets/images/person2.png"
import person3 from "../../../assets/images/person3.png"

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
      },
      {
        ingredientName: "banana",
        ingredientPortion: 150
      },
      {
        ingredientName: "banana",
        ingredientPortion: 150
      },
      {
        ingredientName: "banana",
        ingredientPortion: 150
      },
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
    ],
    personsLiked: [
      {
        personPhoto: person1
      },
      {
        personPhoto: person2
      },
      {
        personPhoto: person3
      },
    ],
    recipeMode: "modo de preparo da receita ... / modo de preparo da receita ... /modo de preparo da receita ... / modo de preparo da receita ... /modo de preparo da receita ... / modo de preparo da receita ... /modo de preparo da receita ... / modo de preparo da receita ... /"
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
            <div className='h-3/5 flex flex-row'>
              <div className='flex flex-col justify-between w-1/2'>
                <div>
                  <h1 className='text-xl text-[#9C4B00]'>
                    {recipeMock.recipeName}
                  </h1>
                  <p className='text-xs text-[#999999]'> 
                  {recipeMock.recipeOrigin}
                  </p>
                  <p className='font-["Poppins"] mt-2 text-base text-[#666565]'> 
                    {recipeMock.recipeAutor}
                  </p>
                  <div className='flex flex-row mt-2'>
                    <RecipeInfo info={'🕙 ' + recipeMock.recipeTime}/>
                    <RecipeInfo info={'🍽️ ' + recipeMock.recipeDifficulty}/>
                    <RecipeInfo info={'🔥 ' + recipeMock.recipeKcal + ' Kcal'}/>
                  </div>
                  <div className='flex flex-row items-center mt-2'>
                    <RecipeRating rating={recipeMock.recipeRating}/>
                    <p className='ml-1'>{recipeMock.recipeRating}</p>
                  </div>
                  <div className='flex flex-row flex-wrap mt-2'>
                    {recipeMock.recipeIngredients.map((ingredient) => {
                      return (
                        <Ingredient name={ingredient.ingredientName}/>
                      )
                    })}
                  </div>
                </div>
                <div className='flex flex-row'>
                    {recipeMock.personsLiked.map((person) => {
                      return (
                        <PersonLiked personPhoto={person.personPhoto}/>
                      )
                    })}
                </div>
                <div className='flex flex-row'>
                  <Like/>
                  <p className='cursor-pointer ml-2' onClick={showComments}>{commentsVisible ? "Ocultar todos os comentários" : "Ver todos os comentários"}</p>
                </div>
              </div>
              <div className='w-1/2 border-l border-solid border-[#f2f2f2] p-2 flex items-center flex-col rounded-md'>
                <h2 className='font-medium'>Modo de preparo</h2>
                <div className='overflow-y-auto scrollbar-hidden text-[#666565]'>
                  <p>{recipeMock.recipeMode}{recipeMock.recipeMode}{recipeMock.recipeMode}{recipeMock.recipeMode}{recipeMock.recipeMode}</p>
                </div>
              </div>
            </div>
            <div className='h-60 overflow-y-auto mt-4'>
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
