import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import { Button, Modal } from 'flowbite-react';
import { alimentos } from './mockAlimentos';

const ModalDefault = () => {
    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [chips, setChips] = useState<string[]>([]);
    const [isInputFocused, setInputFocused] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);
  
      const filtered = alimentos.filter((item) =>
        item.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(value ? filtered.slice(0, 5) : []);
    };
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && inputValue) {
        setChips([...chips, inputValue]);
        setInputValue('');
        setSuggestions([]);
      }
    };
    const handleRemoveChip = (index: number) => {
      const newChips = [...chips];
      newChips.splice(index, 1);
      setChips(newChips);
    };
    const addSuggestionToChips = (suggestion: string) => {
      setChips([...chips, suggestion]);
      setInputValue('');
      setSuggestions([]);
    };

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
                <input type="text" name="recipeName" id="recipeName" 
                placeholder='Escreva o nome da sua receita' 
                className="block w-full h-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400" required/>
              </div>
              <div>
                <div className='flex flex-wrap items-center border-2'>
                  {chips.map((chip, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-orange-500 text-white rounded-xl px-1 m-1 md:px-2 md:m-1.5"
                    >
                      <span>{chip}</span>
                      <button
                        onClick={() => handleRemoveChip(index)}
                        className="ml-1 relative bottom-0.5 md:ml-2 text-white"
                      >
                        x
                      </button>
                    </div>
                  ))}
                  <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder="Digite os alimentos presentes na receita"
                  className="p-1 flex-1 w-full focus:outline-none min-w-10"
                  />
                </div>
                {suggestions.length > 0 && (
                  <div className="mt-2 bg-gray-100 rounded-md shadow">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-1.5 border-t border-gray-300 cursor-pointer text-orange-500 hover:bg-gray-200"
                        onClick={() => addSuggestionToChips(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <input type="time" name="timeMinutes" id="timeMinutes" 
                placeholder='Escreva o tempo de preparo da receita em minutos'
                className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400" required/>
              </div>
              <div>
                <input type="text" name="category" id="category" 
                placeholder='Escreva a origem da receita' 
                className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400" required/>
              </div>
              <div>
                <input type="text" name="description" id="description" 
                placeholder='Escreva uma descrição breve para a receita' 
                className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400" required/>
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

