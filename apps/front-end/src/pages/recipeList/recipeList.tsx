import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react'
import { axiosInstance } from '@cook-show/shared/axios'
import { RecipeType } from '../profile/types/recipe.type'
import { useSearchParams } from 'react-router-dom'
import { IngredientType } from '@cook-show/shared/types'
import Recipe from './recipe'

const getRecipes = async (ingredients: IngredientType[]) => {
  const idIngredients = ingredients.map((i) => {
    return {
      id: i.id,
    }
  })
  const res = await axiosInstance.post(
    '/api/recipe/search/ingredient',
    idIngredients,
  )
  if (res) return res.data as RecipeType[]
  else return null
}

const getFavoritesRecipesUser = async (userId: string) => {
  try {
    return await axiosInstance.get('/api/recipe/user/' + userId + '/favorites')
  } catch (error) {
    alert(error)
  }
}

const RecipeList: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<IngredientType[]>([])
  const [chips, setChips] = useState<IngredientType[]>([])
  const [isInputFocused, setInputFocused] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [recipes, setRecipes] = useState<RecipeType[]>([])
  const [ingredients, setIngredients] = useState<IngredientType[]>([])
  const [ingredientsParams, setIngredientsParams] = useState<IngredientType[]>(
    [],
  )
  const ingredientsId = searchParams.getAll('id')
  const ingredientsName = searchParams.getAll('nome')
  const ingredientsArray = ingredientsId.map((value, index) => {
    return {
      id: Number(value),
      nome: ingredientsName[index],
    } as IngredientType
  })

  const loadIngredients = async () => {
    try {
      const res = await axiosInstance.get('/api/ingredient')
      setIngredients(res.data)
      return res.data as IngredientType[]
    } catch (error) {
      alert(error)
    }
  }

  const handleRemoveChip = (index: number) => {
    const newChips = [...chips]
    newChips.splice(index, 1)
    setChips(newChips)
  }

  const updateUrlParams = (ingredientsArray: IngredientType[]) => {
    const updatedParams = ingredientsArray
      .map((ingredient) => [`id=${ingredient.id}`, `nome=${ingredient.nome}`])
      .flat()
      .join('&')

    setSearchParams(updatedParams)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue) {
      const foundIngredient = ingredients.find((ingredient) =>
        ingredient.nome.startsWith(inputValue),
      )
      if (foundIngredient) setChips([...chips, foundIngredient])

      setInputValue('')
      setSuggestions([])
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

  const addSuggestionToChips = (suggestion: IngredientType) => {
    setChips([...chips, suggestion])
    setInputValue('')
    setSuggestions([])
  }

  useEffect(() => {
    loadIngredients().then((data) => {
      if (data) {
        const updatedIngredients = data.filter((ingredient) => {
          return !ingredientsArray.some((i) => i.nome === ingredient.nome)
        })

        setIngredients(updatedIngredients)
      }
    })
  }, [])

  const handleSearch = () => {
    window.location.reload()
  }

  useEffect(() => {
    const fn = async () => {
      setIngredientsParams(ingredientsArray)
      if (ingredientsArray.length > 0) {
        const recipes = await getRecipes(ingredientsArray)
        if (recipes) setRecipes(recipes)
      }
      setChips([])
      ingredientsArray.forEach((ingredient) => {
        setChips((prev) => [...prev, ingredient])
      })
    }
    fn()
  }, [])

  useEffect(() => {
    if (ingredientsParams.length > 0) {
      getRecipes(ingredientsParams)
    }
  }, [ingredientsParams])

  useEffect(() => {
    updateUrlParams(chips)
  }, [chips])

  return (
    <div className="mx-auto flex w-full flex-col items-center space-y-2 md:max-w-2xl lg:max-w-4xl">
      <div className="relative flex w-screen flex-col items-center justify-center pt-8">
        <div
          className={`flex w-full flex-wrap items-center rounded-lg border-2 bg-white p-1 md:w-1/2 md:p-2 ${
            isInputFocused ? 'border-orange-500' : 'border-gray-300'
          } `}
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
          <div className="absolute top-[83px] z-20 mx-8 w-full rounded-md bg-gray-100 shadow md:w-1/2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer border-b border-gray-300 p-1.5 text-orange-500 hover:bg-gray-200"
                onClick={() => addSuggestionToChips(suggestion)}
              >
                {suggestion.nome}
              </div>
            ))}
          </div>
        )}
      </div>
      {recipes.length > 0 ? (
        <div className="flex h-full w-full flex-wrap">
          {recipes.map((recipe, index) => (
            <Recipe recipe={recipe} key={index}></Recipe>
          ))}
        </div>
      ) : (
        <div>Não foi encontrada nenhuma receita</div>
      )}
    </div>
  )
}

export default RecipeList
