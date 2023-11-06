import React, { useState } from 'react';
import timer from "../../assets/images/relogio.png"
import PersonsLiked from '../../components/ui/personsLiked';
import { Link } from 'react-router-dom';


interface RecipeProps {
    id: string; // id da receita
    image: string;
    imageAlt: string;
    title: string;
    category: string;
    owner: string;
    hours: number;
    minutes: number;
    description: string;
    moreLikes?: number;
    personsLiked: number;
    rating: number;
}

const Recipe: React.FC<RecipeProps> = (props) => {
  const [stateLike, setStateLike] = useState(false)

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

  const recipeURL = `/receitas/${props.id}`

  function changeStateLike() {
    setStateLike(!stateLike)
  }

  const likes = stateLike ? (
    <i className="fa-solid fa-heart fa-xl" style={{ color: '#ff8c00' }}></i>
  ) : (
    <i className="fa-regular fa-heart fa-xl" style={{ color: '#ff8c00' }}></i>
  )

  return (
    <div className="flex w-full w-full pr-5 pb-2 md:w-1/2 md:flex-col md:p-8 md:pr-0 md:pb-0 lg:w-1/3">
      <Link to={recipeURL} className="h-36 w-36 md:h-44 md:w-full">
        <div className="h-36 w-36 overflow-hidden rounded-md md:h-44 md:w-full">
          <img
            src={props.image}
            alt={props.imageAlt}
            className="h-full w-full"
          />
        </div>
      </Link>
      <div className="ml-1 flex h-full w-full flex-col">
        <div className="flex justify-between">
          <Link to={recipeURL}>
            <h1 className="font-medium text-[#ff8c00]">
              {transformCase(props.title)}
            </h1>
          </Link>
          <div className="h-6 w-6 rounded-full bg-[#ff8c00] md:hidden">
            <span className="font-sm flex h-full w-full items-center justify-center text-white ">
              {props.rating}
            </span>
          </div>
        </div>
        <p className="text-xs text-[#999999] md:text-sm">
          {props.category.toUpperCase()}
        </p>
        <div className="flex w-full justify-between">
          <h2 className="text-black">{transformCase(props.owner)}</h2>
          <div className="flex">
            <img
              src={timer}
              alt="tempo estimado da receita"
              className="mr-1 h-4 w-4 self-center"
            />
            <h2 className="m-0">
              {props.hours}h{formattedMinutes(props.minutes)}min
            </h2>
          </div>
        </div>
        <p className="text-xs text-[#999999] md:text-sm">
          {formatDescription(props.description)}
        </p>
        <div className="mt-auto flex justify-between md:pt-8">
          <div onClick={changeStateLike} className="hidden md:block">
            {likes}
          </div>
          <div className='flex'>
            <PersonsLiked personsLiked={props.personsLiked}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recipe

