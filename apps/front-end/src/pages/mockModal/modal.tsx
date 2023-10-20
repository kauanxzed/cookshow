import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Modal } from 'flowbite-react';
import { alimentos } from './mockAlimentos';
import EventEmitter from 'events';


const ModalDefault = () => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputList, setInputList] = useState([
    { ingredient: '', quantity: '' },
  ]);
  const [recipeName, setRecipeName] = useState('');
  const [recipeTime, setRecipeTime] = useState('');
  const [recipeCategory, setRecipeCategory] = useState('');
  const [recipeMode, setRecipeMode] = useState('');
  const [isFocused, setIsFocused] = useState<boolean[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>()
  const [preview, setPreview] = useState("")
  const [errors, setErrors] = useState({
    recipeName: '',
    recipeTime: '',
    recipeCategory: '',
    recipeMode: ''
  });

  interface inputIngrediente {
    ingredient: string;
    quantity: string;
  }

  useEffect(() => {
    if (!selectedFile) {
        setPreview("")
        return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
}, [selectedFile])

const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
  }

  setSelectedFile(e.target.files[0])
}

  const LoadSuggestions = (item: inputIngrediente, inputIndex: number) => {
    if(isFocused[inputIndex] !== true) return
    console.log(item)
    return (
      <div className="w-full absolute top-0 bg-gray-100 rounded-md shadow">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-1.5 border-t border-gray-300 cursor-pointer text-orange-500 hover:bg-gray-200"
            onClick={() => {
              const list: Array<inputIngrediente> = [...inputList];
              list.find((it, ind) => {
                if(it === item) {list[ind].ingredient = suggestion}
              })
              setInputList(list);
              suggestions.length = 0;
              const focused: Array<boolean> = [...isFocused];
              focused[inputIndex] = false;
              setIsFocused(focused);
            }}
          >
            {suggestion}
          </div>
        ))}
      </div>
    );
  };

  const handleInputIngredientChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = e.target;
    const list: Array<inputIngrediente> = [...inputList];
    list[index][name] = value;
    setInputList(list);
    const filtered = alimentos.filter((item) =>
      item.toLowerCase().startsWith(value.toLowerCase()),
    );
    setSuggestions(value ? filtered.slice(0, 5) : []);
    const focused: Array<boolean> = [...isFocused];
    focused[index] = true;
    setIsFocused(focused);
  };

  const handleRemoveClick = (index: number) => {
    const list: Array<inputIngrediente> = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    const lastIndex = inputList[inputList.length - 1];
    if (lastIndex.ingredient !== '' && lastIndex.quantity !== '') {
      setInputList([...inputList, { ingredient: '', quantity: '' }]);
    }
  };

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

  const handleFieldChange = (fieldName: string, msg: string) => {
    if (msg) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: msg,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const hasErrors = Object.values(errors).some((error) => !!error);
    if (!hasErrors) {
      // Continue com o envio do formulário
    }
    console.log("form")
  }

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
        <form onSubmit={handleSubmit}>
          <Modal.Body className="flex justify-between p-0">
            <div className="p-5 flex flex-col items-center justify-center rounded-tl-lg">
              <button
                  className="text-black text-xl self-start"
                  onClick={() => props.setOpenModal(undefined)}
                >
                  X
                </button>
              <div className="rounded-full w-72 h-72 bg-white border-solid border border-[#FF7A00] flex justify-center align-center overflow-hidden">
                {selectedFile &&  <img src={preview} alt='imagem escolhida' className='w-full h-full'/> }
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <p className="">Selecione uma foto do seu dispositivo</p>
                <div className="bg-[#2D3748] duration-300 hover:bg-[#1f2732] rounded-md w-36 h-10 flex items-center justify-center mt-4">
                  <label
                    htmlFor="photoRecipe"
                    className="custom-file-upload text-white text-sm h-full w-full text-center cursor-pointer"
                  >
                    <p className="flex justify-center items-center h-full w-full">
                      Selecionar
                    </p>
                  </label>
                </div>
                <input
                  id="photoRecipe"
                  name="photoRecipe"
                  type="file"
                  accept="image/*"
                  onChange={onSelectFile}
                  className="hidden"
                />
              </div>
            </div>
            <div className="space-y-6 p-5 w-full flex flex-col overflow-y-scroll">
              <div className='h-full '>
                <input
                  type="text"
                  name="recipeName"
                  id="recipeName"
                  placeholder="Título da receita"
                  className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400 border-none focus:ring-0"
                  value={recipeName}
                  onChange={(e) => {
                    setRecipeName(e.target.value);
                    handleFieldChange('recipeName', "")
                  }}
                  onBlur={(e) => {
                    const inputValue = e.target.value;
                    if (!inputValue.trim()) {
                      setRecipeName("")
                      handleFieldChange('recipeName', "O campo deve conter letras")
                    }
                    if (!inputValue.match(/^[A-Za-z\s]+$/)) {
                      setRecipeName("")
                      handleFieldChange('recipeName', "O campo deve apenas letras e espaços")
                    }
                  }}
                  required
                />
                {errors.recipeName && <p className='text-red-500'>{errors.recipeName}</p>}
              </div>
              {inputList.map((item, i) => {
                return (
                    <div className="box">
                      <div className="flex">
                        <div className='flex flex-col w-full justify-center items-center'>
                          <div className="flex flex-col w-full">
                            <input
                              type="text"
                              name="ingredient"
                              value={item.ingredient}
                              onChange={(e) => handleInputIngredientChange(e, i)}
                              placeholder="Ingrediente"
                              className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400 border-none focus:ring-0"
                              required
                            />
                          </div>
                          <div className='relative w-full'>
                            {isFocused[i] && LoadSuggestions(item, i)}
                          </div>
                          
                        </div>
                      <div className='h-full w-1/5 ml-2 p-3 '>
                        <input
                          className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400 border-none focus:ring-0 text-center"
                          type="text"
                          required
                          name="quantity"
                          placeholder="Qnt"
                          value={item.quantity}
                          onChange={(e) => {
                            handleQuantityChange(e, i)
                          }}
                        />
                      </div>
                    </div>
                    <div className="btn-box flex flex-col items-start">
                      {inputList.length !== 1 && (
                        <button
                          className="text-red-500"
                          onClick={() => handleRemoveClick(i)}
                        >
                          Remover
                        </button>
                      )}
                      {inputList.length - 1 === i && (
                        <button className="mt-4" onClick={handleAddClick}>
                          + ingrediente
                        </button>
                      )}
                    </div>
                    </div>
                    
                );
              })}
              <div className='h-full'>
                <input
                  type="time"
                  name="recipeTime"
                  id="recipeTime"
                  className="block w-2/4 p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400 before-content [&:not(:valid)] border-none focus:ring-0"
                  value={recipeTime}
                  onChange={(e) => {
                    setRecipeTime(e.target.value);
                    handleFieldChange('recipeTime', "")
                  }}
                  onBlur={(e) => {
                    const inputValue = e.target.value;
                    if (!inputValue.trim()) {
                      setRecipeTime("")
                      handleFieldChange('recipeTime', "Informe um tempo")
                    }
                  }}
                  required
                />
                {errors.recipeTime && <p className='text-red-500'>{errors.recipeTime}</p>}
              </div>
              <div className='h-full'>
                <input
                  type="text"
                  name="recipeCategory"
                  id="recipeCategory"
                  placeholder="Origem da receita"
                  className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400 border-none focus:ring-0"
                  value={recipeCategory}
                  onChange={(e) => {
                    setRecipeCategory(e.target.value);
                    handleFieldChange('recipeCategory', "")
                  }}
                  onBlur={(e) => {
                    const inputValue = e.target.value;
                    if (!inputValue.trim()) {
                      setRecipeCategory("")
                      handleFieldChange('recipeCategory', "O campo deve conter letras")
                    }
                    if (!inputValue.match(/^[A-Za-z\s]+$/)) {
                      setRecipeCategory("")
                      handleFieldChange('recipeCategory', "O campo deve apenas letras e espaços")
                    }
                  }}
                  required
                />
                {errors.recipeCategory && <p className='text-red-500'>{errors.recipeCategory}</p>}
              </div>
              <div className='h-full'>
                <input
                  type="text"
                  name="recipeMode"
                  id="recipeMode"
                  placeholder="Modo de preparo da receita"
                  className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400 border-none focus:ring-0"
                  value={recipeMode}
                  onChange={(e) => {
                    setRecipeMode(e.target.value);
                    handleFieldChange('recipeMode', "")
                  }}
                  onBlur={(e) => {
                    const inputValue = e.target.value;
                    if (!inputValue.trim()) {
                      setRecipeMode("")
                      handleFieldChange('recipeMode', "O campo deve conter letras")
                    }
                    if (!inputValue.match(/^[A-Za-z\s]+$/)) {
                      setRecipeMode("")
                      handleFieldChange('recipeMode', "O campo deve apenas letras e espaços")
                    }
                  }}
                  required
                />
                {errors.recipeMode && <p className='text-red-500'>{errors.recipeMode}</p>}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="flex items-center justify-center">
            <button
              className="w-72 h-12 bg-[#9C4B00] text-white hover:bg-[#6d3500] duration-300"
              type='submit'
            >
              Compartilhar
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default ModalDefault;
