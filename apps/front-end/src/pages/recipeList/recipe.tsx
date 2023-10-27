import React, { useState } from 'react';
import timer from "../../assets/images/relogio.png"
import PersonLiked from './personLiked';
import heart from "../../assets/images/coração.png"
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
    person1?: string;
    person2?: string;
    person3?: string;
    rating: number;
}

const Recipe: React.FC<RecipeProps> = props => {

    const [stateLike, setStateLike] = useState(false)

    function transformCase(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }

    function formatDescription(description: string): string {
        if (!description.startsWith('"')) {
          description = '"' + description;
        }
        if (!description.endsWith('"')) {
          description = description + '"';
        }
        return description[0] + description.charAt(1).toUpperCase() + description.slice(2).toLowerCase();
    }

    function formattedMinutes(minutes: number): string{
        return minutes.toString().padStart(2, '0');
    } 

    const recipeURL = `/receitas/${props.id}`

    function changeStateLike() {
        setStateLike(!stateLike)
    }

    const likes = stateLike ? <i className="fa-solid fa-heart fa-xl" style={{color: "#ff8c00"}}></i> 
                            : <i className="fa-regular fa-heart fa-xl" style={{color: "#ff8c00"}}></i>

    return (
        <div className='lg:w-1/3 flex md:w-1/2 w-full md:flex-col md:p-8 w-full pr-5 md:pr-0 pb-2 md:pb-0' >
            <Link to={recipeURL} className='h-36 w-36 md:h-44 md:w-full'>
                <div className='rounded-md overflow-hidden h-36 w-36 md:h-44 md:w-full'>
                    <img src = {props.image} alt = {props.imageAlt} className='w-full h-full'/>
                </div>
            </Link>
            <div className='flex flex-col w-full h-full ml-1' >
                <div className='flex justify-between'>
                    <Link to={recipeURL}>
                        <h1 className='text-[#ff8c00] font-medium'>{transformCase(props.title)}</h1>
                    </Link>
                    <div className='w-6 h-6 rounded-full bg-[#ff8c00] md:hidden'>
                        <span className='font-sm text-white w-full h-full flex items-center justify-center '>{props.rating}</span>
                    </div>
                </div>
                <p className='text-[#999999] text-xs md:text-sm'>{props.category.toUpperCase()}</p>
                <div className='flex justify-between w-full'>
                    <h2 className='text-black'>{transformCase(props.owner)}</h2>
                    <div className='flex'>
                        <img src= {timer} alt = "tempo estimado da receita" className='h-4 w-4 self-center mr-1'/>
                        <h2 className='m-0'>{props.hours}h{formattedMinutes(props.minutes)}min</h2>
                    </div>
                </div>
                <p className='text-[#999999] text-xs md:text-sm'>{formatDescription(props.description)}</p>
                <div className='flex justify-between mt-auto md:pt-8'>
                    <div onClick={changeStateLike} className='hidden md:block'> 
                        {likes}
                    </div>
                    <div className='flex'>
                        {props.person1 !== undefined && (
                            <PersonLiked personPhoto={props.person1}/>
                        )}
                        {props.person2 !== undefined && (
                            <PersonLiked personPhoto={props.person2}/>
                        )}
                        {props.person3 !== undefined && (
                            <PersonLiked personPhoto={props.person3}/>
                        )}
                        {props.moreLikes !== undefined && (
                            <div className='w-6 h-6 rounded-full -ml-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] bg-white'>
                                <span className='font-sm text-[#A8A8A8] w-full h-full flex items-center justify-start'>+{props.moreLikes}</span>
                            </div>
                        )}
                        {props.person1 !== undefined && (
                            <div className='self-end mt-4 -ml-2 relative z-2'>
                                <img src= {heart} alt="" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recipe;