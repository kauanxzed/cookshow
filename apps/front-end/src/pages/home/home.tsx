import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react'
import Logo from '../../assets/images/Logo.png'
import { axiosInstance } from '@cook-show/shared/axios'
import { typeIngredient } from '../../types/typeIngredient'
import { useNavigate } from 'react-router-dom'

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [chips, setChips] = useState<typeIngredient[]>([])
  const [suggestions, setSuggestions] = useState<typeIngredient[]>([])
  const [isInputFocused, setInputFocused] = useState(false)
  const [ingredients, setIngredients] = useState<typeIngredient[]>([
    { nome: '', id: 0 },
  ])
  const navigate = useNavigate()

  useEffect(() => {
    loadIngredients()
  }, [])

  const loadIngredients = async () => {
    try {
      await axiosInstance.get('/api/ingredient').then((Response) => {
        setIngredients(Response.data)
      })
    } catch (error) {
      alert(error)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    const filtered = ingredients.filter(
      (el) =>
        el.nome.toLowerCase().startsWith(value.toLowerCase()) &&
        !chips.includes(el),
    )
    setSuggestions(value ? filtered.slice(0, 5) : [])
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue) {
      //setChips([...chips, inputValue])
      setInputValue('')
      setSuggestions([])
    }
  }

  const handleRemoveChip = (index: number) => {
    const newChips = [...chips]
    newChips.splice(index, 1)
    setChips(newChips)
  }

  const addSuggestionToChips = (suggestion: typeIngredient) => {
    setChips([...chips, suggestion])
    setInputValue('')
    setSuggestions([])
  }

  const handleSearch = () => {
    const urlParams = new URLSearchParams()
    chips.forEach((obj) => {
      const parsed = {
        id: obj.id,
        nome: obj.nome,
      }
      Object.entries(parsed).forEach(([key, value]) => {
        urlParams.append(key, value.toString())
      })
    })
    const url = '/receitas?' + urlParams.toString()
    navigate(url)
  }

  return (
    <div className="mx-auto mt-8 flex w-full max-w-xl flex-col items-center justify-start space-y-2 p-4 sm:p-8 md:mt-4 md:max-w-2xl lg:mt-0 lg:max-w-4xl">
      <img
        src={Logo}
        alt="Logo CookShow"
        className="lg: mb-2.5 mt-16 h-[120px] w-auto md:h-[130px] lg:h-[170px]"
      />

      <div className="w-full">
        <div
          className={`flex flex-wrap items-center border-2 ${
            isInputFocused ? 'border-orange-500' : 'border-gray-300'
          } rounded-lg p-1 md:p-2`}
        >
          <span
            className="mr-1 text-lg hover:cursor-pointer md:mr-2"
            aria-label="magnifying glass"
            role="img"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="27"
              height="27"
              viewBox="0,0,256,256"
            >
              <g
                fill="#787474"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
              >
                <g transform="scale(5.33333,5.33333)">
                  <path d="M20.5,6c-7.99037,0 -14.5,6.50964 -14.5,14.5c0,7.99036 6.50963,14.5 14.5,14.5c3.45636,0 6.63371,-1.22096 9.12891,-3.25l9.81055,9.81055c0.37623,0.39185 0.9349,0.54969 1.46055,0.41265c0.52565,-0.13704 0.93616,-0.54754 1.07319,-1.07319c0.13704,-0.52565 -0.0208,-1.08432 -0.41265,-1.46055l-9.81055,-9.81055c2.02904,-2.4952 3.25,-5.67255 3.25,-9.12891c0,-7.99036 -6.50963,-14.5 -14.5,-14.5zM20.5,9c6.36905,0 11.5,5.13096 11.5,11.5c0,3.10261 -1.2238,5.90572 -3.20898,7.9707c-0.12237,0.08994 -0.23037,0.19794 -0.32031,0.32031c-2.06499,1.98518 -4.86809,3.20898 -7.9707,3.20898c-6.36905,0 -11.5,-5.13096 -11.5,-11.5c0,-6.36904 5.13095,-11.5 11.5,-11.5z"></path>
                </g>
              </g>
            </svg>
          </span>
          {chips.map((chip, index) => (
            <div
              key={index}
              className="m-1 flex items-center rounded-xl bg-orange-500 px-1 text-white md:m-1.5 md:px-2"
            >
              <span>{chip.nome}</span>
              <button
                onClick={() => handleRemoveChip(index)}
                className="relative bottom-0.5 ml-1 text-white md:ml-2"
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
            placeholder="Digite os alimentos desejados..."
            className="min-w-0 flex-1 border-none p-1 focus:outline-none focus:ring-0"
          />
        </div>
        {suggestions.length > 0 && (
          <div className="mt-2 rounded-md bg-gray-100 shadow">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer border-t border-gray-300 p-1.5 text-orange-500 hover:bg-gray-200"
                onClick={() => addSuggestionToChips(suggestion)}
              >
                {suggestion.nome}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar
