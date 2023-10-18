import React, {useState, ChangeEvent} from 'react';
import { Button, Modal } from 'flowbite-react';
import { alimentos } from './mockAlimentos';

const ModalDefault = () => {
    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isInputFocused, setInputFocused] = useState(false);
    const [inputList, setInputList] = useState([{ ingredient: "", quantity: "" }]);
    const [recipeName, setRecipeName] = useState("")
    const [recipeTime, setRecipeTime] = useState("")
    const [recipeOrigin, setRecipeOrigin] = useState("")
    const [recipeDescription , setRecipeDescription] = useState("")

    interface inputIngrediente {
      ingredient: string,
      quantity: string,
    }

    const handleInputIngredientChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
      const { name, value } = e.target;
      const list: Array<inputIngrediente> = [...inputList];
      list[index][name] = value;
      setInputList(list);
      const filtered = alimentos.filter((item) =>
        item.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(value ? filtered.slice(0, 5) : []);
    };

    const handleRemoveClick = (index:number) => {
      const list: Array<inputIngrediente>  = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };

    const handleAddClick = () => {
      const lastIndex = inputList[inputList.length-1];
      if(lastIndex.ingredient !== "" && lastIndex.quantity !== "") {setInputList([...inputList, { ingredient: "", quantity: "" }])}
    };

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
      const value = event.target.value
      if (!isNaN(+value)) {
        const list = [...inputList];
        list[index].quantity = value;
        setInputList(list);
      }
    };
    
    return (
      <>
        <Button onClick={() => props.setOpenModal('default')}>Toggle modal</Button>
        <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
          <Modal.Body className='flex justify-between p-0'>
            <div className='background-register-recipe p-5 flex flex-col items-center justify-center rounded-tl-lg'>
                <div className='rounded-full w-72 h-72 bg-white border-solid border border-[#FF7A00] flex justify-center align-center'>
                  
                </div>
                <div className='flex flex-col items-center justify-center p-2'>
                  <p className=''>Selecione uma foto do seu dispositivo</p>
                  <div className='bg-[#2D3748] duration-300 hover:bg-[#1f2732] rounded-md w-36 h-10 flex items-center justify-center mt-4'>
                    <label htmlFor="photoRecipe" className="custom-file-upload text-white text-sm h-full w-full text-center cursor-pointer">
                      <p className='flex justify-center items-center h-full w-full'>Selecionar</p>
                    </label>              
                  </div>
                  <input id="photoRecipe" name="photoRecipe" type="file" accept=".jpg, .jpeg, .png" className='hidden'/>
                </div>
              </div>
              <div className="space-y-6 p-5 w-full flex flex-col">
                <button className='text-[#B6B6B6] text-xl self-end' onClick={() => props.setOpenModal(undefined)}>
                  X
                </button>
                <div>
                  <input type="text" name="recipeName" id="recipeName" 
                  placeholder='Escreva o nome da sua receita' 
                  className="block w-full h-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400"
                  value={recipeName}
                  onChange={(e) => {setRecipeName(e.target.value)}}
                  required/>
                </div>
                {inputList.map((item, i) => {
                  return (
                    <div className="box">
                      <div className='flex justify-between'>
                        <div className='flex flex-col'>
                          <input
                            type="text"
                            name="ingredient"
                            value={item.ingredient}
                            onChange={e => handleInputIngredientChange(e, i)}
                            onFocus={() => setInputFocused(true)}
                            onBlur={() => setInputFocused(false)}
                            placeholder="Ingrediente"
                            className="block w-full h-full bg-gray-100 rounded-lg outline-none focus:outline-orange-400" 
                            required
                          />
                          {inputList.length - 1 === i && suggestions.length > 0 && (
                            <div className="mt-2 bg-gray-100 rounded-md shadow">
                              {suggestions.map((suggestion, index) => (
                                <div
                                  key={index}
                                  className="p-1.5 border-t border-gray-300 cursor-pointer text-orange-500 hover:bg-gray-200"
                                  onClick={() => { 
                                    item.ingredient = suggestion
                                    suggestions.length = 0                              
                                  }}
                                >
                                  {suggestion}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <input
                          className="block w-1/5 ml-2 p-3 h-full bg-gray-100 rounded-lg outline-none focus:outline-orange-400 text-center" 
                          type="text"
                          required
                          name="quantity"
                          placeholder="Qnt"
                          value={item.quantity}
                          onChange={e => handleQuantityChange(e, i)}
                        />
                      </div>
                      <div className="btn-box flex flex-col items-start">
                        {inputList.length !== 1 && <button className="text-red-500" onClick={() => handleRemoveClick(i)}>Remover</button>}
                        {inputList.length - 1 === i && <button className='mt-4' onClick={handleAddClick}>+ ingrediente</button>}
                      </div>
                    </div>
                  );
                })}
                <div>
                <input type="time" name="timeMinutes" id="timeMinutes" 
                className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400 before-content [&:not(:valid)]"
                value={recipeTime}
                onChange={(e) => {setRecipeTime(e.target.value)}}
                required/>
              </div>
              <div>
                <input type="text" name="category" id="category" 
                placeholder='Escreva a origem da receita' 
                className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400" 
                value={recipeOrigin}
                onChange={(e) => {setRecipeOrigin(e.target.value)}}
                required/>
              </div>
              <div>
                <input type="text" name="description" id="description" 
                placeholder='Escreva uma descrição breve para a receita' 
                className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400"
                value={recipeDescription}
                onChange={(e) => {setRecipeDescription(e.target.value)}}
                required/>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className='flex items-center justify-center'>
            <button className="w-72 h-12 bg-[#9C4B00] text-white hover:bg-[#6d3500] duration-300" onClick={() => props.setOpenModal(undefined)}>Compartilhar</button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

export default ModalDefault;

