import React, { useEffect, useState } from 'react'
import timer from '../../assets/images/relogio.png'
import PersonsLiked from '../../components/ui/personsLiked'
import RecipeModal from '../recipe/recipe'
import { RecipeType } from '../profile/types/recipe.type'
import { axiosInstance } from '@cook-show/shared/axios'
import Like from '../../components/ui/like/like'

interface RecipeProps {
  recipe: RecipeType
}

async function getLikes(recipeId: string) {
  try {
    const res = await axiosInstance.get(
      '/api/recipe/' + recipeId + '/favoritesQuantity',
    )
    return res.data as number
  } catch (error) {
    alert(error)
  }
}

async function getRating(recipeId: string) {
  try {
    const res = await axiosInstance.get('/api/recipe/' + recipeId + '/rating')
    return res.data as number
  } catch (error) {
    alert(error)
  }
}

const Recipe: React.FC<RecipeProps> = (props) => {
  const [stateLike, setStateLike] = useState(false)
  const [openModal, setOpenModal] = useState<undefined | boolean>(undefined)
  const [likesNum, setLikesNum] = useState(0)
  const [rating, setRating] = useState(0)
  const [hoursStr, minutesStr] = props.recipe.tempo_preparo.split(':')
  const hours = parseInt(hoursStr, 10)
  const minutes = parseInt(minutesStr, 10)
  const [ownerName, setOwnerName] = useState('')

  useEffect(() => {
    const fn = async () => {
      let res = await getRating(props.recipe.id)
      if (res) setRating(res)
      res = await getLikes(props.recipe.id)
      if (res) setLikesNum(res)
    }
    fn()
    axiosInstance
          .get('/api/user/' + props.recipe.user.id)
          .then((data) => setOwnerName(data.data.usuario))
  }, [props.recipe.id])

  function transformCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  function formatDescription(description: string): string {
    if (!description.startsWith('"')) {
      description = '"' + description
    }
    if (!description.endsWith('"')) {
      description = description + '"'
    }
    return (
      description[0] +
      description.charAt(1).toUpperCase() +
      description.slice(2).toLowerCase()
    )
  }

  function formattedMinutes(minutes: number): string {
    return minutes.toString().padStart(2, '0')
  }

  const recipeURL = `/receitas/${props.recipe.id}`

  const handleSetOpenModal = (value: boolean | undefined) => {
    setOpenModal(value)
  }

  

  return (
    <div className="flex w-full pr-5 pb-2 md:w-1/2 md:flex-col md:p-8 md:pr-0 md:pb-0 lg:w-1/3">
      <div className="h-36 w-36 cursor-pointer overflow-hidden rounded-md md:h-44 md:w-full">
        <img
          src={props.recipe.imagem}
          alt={props.recipe.titulo}
          className="h-full w-full"
          onClick={() => {
            handleSetOpenModal(true)
          }}
        />
      </div>
      <div className="ml-1 flex h-full w-full flex-col">
        <div className="flex justify-between">
            <h1 className="font-medium text-[#ff8c00]" onClick={() => {handleSetOpenModal(true)}}>
              {transformCase(props.recipe.titulo)}
            </h1>
          <div className="h-6 w-6 rounded-full bg-[#ff8c00] md:hidden">
            <span className="font-sm flex h-full w-full items-center justify-center text-white ">
              {Number.isInteger(rating) ? `${rating}.0` : rating}
            </span>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <h2 className="text-black">{transformCase(ownerName)}</h2>
          <div className="flex">
            <img
              src={timer}
              alt="tempo estimado da receita"
              className="mr-1 h-4 w-4 self-center"
            />
            <h2 className="m-0">
              {hours}h{formattedMinutes(minutes)}min
            </h2>
          </div>
        </div>
        <p className="text-xs text-[#999999] md:text-sm">
          {formatDescription(props.recipe.descricao)}
        </p>
        <div className="mt-auto flex justify-between md:pt-8">
          <Like id_receita={props.recipe.id} />
          <div className="flex">
            <PersonsLiked likes={likesNum} />
          </div>
        </div>
      </div>
      {openModal === true && (
        <RecipeModal
          show={openModal}
          setOpenModal={handleSetOpenModal}
          id={props.recipe.id}
        />
      )}
    </div>
  )
}

export default Recipe
