import React, { useState, ChangeEvent } from 'react';
import { Button, Modal } from 'flowbite-react';


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
        size="5xl"
      >
        <Modal.Body className="flex justify-between p-0">
          <div className="p-5 flex flex-col items-center justify-center rounded-tl-lg">
            <button
                className="text-black text-xl self-start"
                onClick={() => props.setOpenModal(undefined)}
              >
                X
              </button>
            <div className="rounded-full w-72 h-72 bg-white border-solid border border-[#FF7A00] flex justify-center align-center"></div>
            <div className="flex flex-col items-center justify-center p-2">
              <p className="">Descrição da receita</p>
              <input
                id="photoRecipe"
                name="photoRecipe"
                type="file"
                accept=".jpg, .jpeg, .png"
                className="hidden"
              />
            </div>
          </div>
          <div className="p-5 w-full flex flex-col overflow-y-scroll overflow-auto">
            <p className='text-xl text-[#9C4B00]'>
              Carne Louca
            </p>
            <p className='text-xs text-[#999999]'> 
              ITALIANO
            </p>
            <p className='font-["Poppins"] mt-2 text-base text-[#666565]'> 
              Rafaela
            </p>
            <p className='text-sm text-[#666565]'>
              🕙 0h40min 🍽️ Média 🔥 678 Kcal
            </p>
            <p className='mt-2'>
              ⭐⭐⭐⭐⭐ 4.8
            </p>
            {ingredients.map((ingredient) => {
              return (
                <div className="w-fit flex-col flex items-center bg-orange-500 text-white rounded-xl px-1 m-1 md:px-2 md:m-1.5">
                  <span>{ingredient.nome}</span>
                </div>
              )
            })}
            
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalDefault;
