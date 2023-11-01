import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import alimentos from './alimentos';
import Recipe from './recipe';
import prato1 from "../../assets/images/prato1.png"
import prato2 from "../../assets/images/prato2.png"
import prato3 from "../../assets/images/prato3.png"
import prato4 from "../../assets/images/prato4.png"
import prato5 from "../../assets/images/prato5.png"
import prato6 from "../../assets/images/prato6.png"

const RecipeList: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [chips, setChips] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isInputFocused, setInputFocused] = useState(false)

  const handleRemoveChip = (index: number) => {
    const newChips = [...chips]
    newChips.splice(index, 1)
    setChips(newChips)
  }
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue) {
      setChips([...chips, inputValue])
      setInputValue('')
      setSuggestions([])
    }
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)

    const filtered = alimentos.filter((item) =>
      item.toLowerCase().startsWith(value.toLowerCase()),
    )
    setSuggestions(value ? filtered.slice(0, 5) : [])
  }

  const addSuggestionToChips = (suggestion: string) => {
    setChips([...chips, suggestion])
    setInputValue('')
    setSuggestions([])
  }

  return (
    <div className="mx-auto flex w-full flex-col items-center space-y-2 md:max-w-2xl lg:max-w-4xl">
      <div className="flex w-screen flex-col items-center justify-center bg-cover bg-center p-8">
        <div
          className={`flex flex-wrap items-center border-2 ${
            isInputFocused ? 'border-orange-500' : 'border-gray-300'
          } w-full rounded-lg bg-white p-1 md:w-1/2 md:p-2`}
        >
          <span
            className="mr-1 text-lg md:mr-2"
            aria-label="magnifying glass"
            role="img"
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
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
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
              <span>{chip}</span>
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
            className="min-w-0 flex-1 p-1 border-none focus:outline-none focus:ring-0"
          />
        </div>
        {suggestions.length > 0 && (
          <div className="mt-2 w-full rounded-md bg-gray-100 shadow md:w-1/2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer border-t border-gray-300 p-1.5 text-orange-500 hover:bg-gray-200"
                onClick={() => addSuggestionToChips(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full h-screen flex flex-wrap overflow-y-auto overflow-x-hidden scrollbar-hidden pb-60">
        <Recipe image = {prato1} imageAlt='foto representando o prato Pizza margherita' title='pizza marGherIta' category='ITALIANO' owner='fabiana' hours={0} minutes={50} 
        description='"Receita de PIZZA Margherita deliciosa e fácil para reunir a família e apreciar com gosto!"' 
        personsLiked={80} moreLikes = {50} id='teste1' rating={4.8} />

        <Recipe image = {prato2} imageAlt='foto representando o prato Sopa de Rámen' title='Sopa de Rámen' category='CHINÊS' owner='Yuri' hours={1} minutes={30} 
        description='Diferente e delicioso!'
        personsLiked={12} moreLikes = {42} id='teste2' rating={4.4} />

        <Recipe image = {prato3} imageAlt='foto representando o prato shakshuka' title='shakshuka' category='ORIENTE MÉDIO' owner='Thiago' hours={0} minutes={5} 
        description='Rápido e sofisticado.' 
        personsLiked={34} moreLikes = {90} id='teste3' rating={4.9} />

        <Recipe image = {prato4} imageAlt='foto representando o prato Torta de carne com ovo' title='Torta de carne com ovo' category='GREGO' owner='Marcela' hours={1} minutes={10} 
        description='Diferente e delicioso!' 
        personsLiked={6} moreLikes = {26} id='teste4' rating={4.7} />

        <Recipe image = {prato5} imageAlt='foto representando o prato Picadinho' title='Picadinho' category='BRASILEIRO' owner='Rafa' hours={2} minutes={0} 
        description='Típico prato brasileiro!' 
        personsLiked={55} moreLikes = {26} id='teste5' rating={4.8} />

        <Recipe image = {prato6} imageAlt='foto representando o prato Carne de panela desfiada' title='Carne de panela desfiada' category='CHINÊS' owner='Yuri' hours={1} minutes={30} 
         description='Diferente e delicioso!' 
         personsLiked={8} id='teste6' rating={4.1}/>
      </div>
    </div>
  )
}

export default RecipeList
