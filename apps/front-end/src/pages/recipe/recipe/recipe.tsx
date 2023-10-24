import React, { useState, ChangeEvent } from 'react';
import { Button, Modal } from 'flowbite-react';
import RecipeInfo from './recipeInfo';


const ingredients = [
  {nome: 'carne'},
  {nome: 'miojo'},
  {nome: 'maçã'},
  {nome: 'pera'},
  {nome: 'banana'}
]


const ModalDefault = () => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const [inputList, setInputList] = useState([
    { ingredient: '', quantity: '' },
  ]);
  const [recipeName, setRecipeName] = useState('');
  const [recipeTime, setRecipeTime] = useState('');
  const [recipeOrigin, setRecipeOrigin] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');  
  const handleQuantityChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = event.target.value;
    if (!isNaN(+value)) {
      const list = [...inputList];
      list[index].quantity = value;
      setInputList(list);
    }
  };

  return (
    <>
      <Button onClick={() => props.setOpenModal('default')}>
        Toggle modal
      </Button>
      <Modal
        show={props.openModal === 'default'}
        onClose={() => props.setOpenModal(undefined)}
        size="5x1"
      >
        <Modal.Body className="flex justify-between p-0">
          <div className="bg-gradient-to-r from-[#FF7A00] mr-10 p-5 flex flex-col items-center justify-center rounded-tl-lg">
            <button
                className="text-black text-xl self-start"
                onClick={() => props.setOpenModal(undefined)}
              >
                X
              </button>
            <div className="rounded-full w-72 h-72 bg-white border-solid border border-[#FF7A00] flex justify-center align-center"></div>
            <div className="text-base flex flex-col items-center justify-center p-2">
              <p className="">“Sua origem é italiana, parente da carne lessa, receita à base de carne cozida e desfiada.”</p>
              <input
                id="photoRecipe"
                name="photoRecipe"
                type="file"
                accept=".jpg, .jpeg, .png"
                className="hidden"
              />
            </div>
          </div>
          <div className="p-5 w-full flex flex-col">
            <p className='text-xl text-[#9C4B00]'>
              Carne Louca
            </p>
            <p className='text-xs text-[#999999]'> 
              ITALIANO
            </p>
            <p className='font-["Poppins"] mt-2 text-base text-[#666565]'> 
              Rafaela
            </p>
            <div className='flex flex-row'>
              <RecipeInfo info={'🕙 0h40min'}/>
              <RecipeInfo info={'🍽️ Média'}/>
              <RecipeInfo info={'🔥 678 Kcal'}/>
            </div>
            <p className='mt-2'>
              ⭐⭐⭐⭐⭐ 4.8
            </p>

            <div className='flex flex-row'>
              {ingredients.map((ingredient) => {
                return (
                    <div className="w-fit text-sm bg-orange-500 text-white rounded-xl px-1 m-1 md:px-2 md:m-0.5">
                      <p>{ingredient.nome}</p>
                    </div>
                )
              })}
            </div>
                <div className='flex flex-row'>
                  <div className="mt-20 rounded-full w-6 h-6 bg-white border-solid border border-[#FF7A00]"></div>
                  <div className="mt-20 rounded-full w-6 h-6 bg-white border-solid border border-[#FF7A00]"></div>
                  <div className="mt-20 rounded-full w-6 h-6 bg-white border-solid border border-[#FF7A00]"></div>
                  <div className="mt-20 rounded-full w-6 h-6 bg-white border-solid border border-[#FF7A00]"></div>
              </div>
              <div className='mt-20 flex flex-row'>
              🧡 Ver todos os comentários
            </div>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalDefault;
