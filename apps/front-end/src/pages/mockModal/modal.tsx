import React, {useState} from 'react';
import { Button, Modal } from 'flowbite-react';

const ModalDefault = () => {
    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };
  
    return (
      <>
        <Button onClick={() => props.setOpenModal('default')}>Toggle modal</Button>
        <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
          <Modal.Body className='flex justify-between p-0'>
            <div className='background-register-recipe pt-5 flex flex-col items-center justify-center'>
              <div className='rounded-full w-72 h-72 bg-white border-solid border border-[#FF7A00]'>
              </div>
              <div className='flex flex-col items-center justify-center p-2'>
                <p className=''>Selecione uma foto do seu dispositivo</p>
                <div className='bg-[#2D3748] duration-300 hover:bg-[#1d242f] rounded-md w-36 h-10 flex items-center justify-center mt-4'>
                  <label htmlFor="photoRecipe" className="custom-file-upload text-white text-sm h-full w-full text-center cursor-pointer">
                    <p className='flex justify-center items-center h-full w-full'>Selecionar</p>
                  </label>              
                </div>
                <input id="photoRecipe" name="photoRecipe" type="file" accept=".jpg, .jpeg, .png" className='hidden'/>
              </div>
            </div>
            <div className="space-y-6 p-5 w-full">
              <div>
                <input type="text" name="recipeName" id="recipeName" placeholder='Escreva o nome da sua receita' className="bg-gray-50 border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
              </div>
              {/* ADD RECEITA */}
              <div>
                <input type="time" name="timeMinutes" id="timeMinutes" placeholder='Escreva o tempo de preparo da receita em minutos' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
              </div>
              <div>
                <input type="text" name="category" id="category" placeholder='Escreva a origem da receita' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
              </div>
              <div>
                <input type="text" name="description" id="description" placeholder='Escreva uma descrição breve para a receita' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => props.setOpenModal(undefined)}>I accept</Button>
            <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
              Decline
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

export default ModalDefault;

