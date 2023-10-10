import React, {useState} from 'react';
import { Button, Modal } from 'flowbite-react';

const ModalDefault = () => {
    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };
  
    return (
      <>
        <Button onClick={() => props.setOpenModal('default')}>Toggle modal</Button>
        <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
          <Modal.Body className='flex justify-between'>
            <div>
              <div className='rounded-full'>

              </div>
              <div>
                <p>Selecione uma foto do seu dispositivo</p>
                <label htmlFor="photoRecipe" className="custom-file-upload">
                  Selecionar foto
                </label>
                <input id="photoRecipe" name="photoRecipe" type="file" accept=".jpg, .jpeg, .png" className='invisible'/>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <input type="text" name="recipeName" id="recipeName" placeholder='Escreva o nome da sua receita' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
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

