import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import timer from "../../assets/images/relogio.png"
import like from "../../assets/images/like.png"
import liked from "../../assets/images/likeInteragido.png"
import tt from "../../assets/images/coração.png"
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

const recipe: React.FC<RecipeProps> = props => {
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

    return (
        <div className='lg:w-1/3 flex md:w-1/2 w-full md:flex-col md:p-8 w-full pr-5 md:pr-0 pb-2 md:pb-0' >
            <Link to={recipeURL} className='h-36 w-36 md:h-44 md:w-full'>
                <div className='rounded-md overflow-hidden h-36 w-36 md:h-44 md:w-full'>
                    <img src = {props.image} alt = {props.imageAlt} className='w-full h-full'/>
                </div>
            </Link>
            <div className='flex flex-col w-full h-full'>
                <div className='flex justify-between'>
                    <Link to={recipeURL}>
                        <h1 className='text-color-orange font-medium'>{transformCase(props.title)}</h1>
                    </Link>
                    <div className='w-6 h-6 rounded-full bg-color-orange md:hidden'>
                        <span className='rating w-full h-full flex items-center justify-center '>{props.rating}</span>
                    </div>
                </div>
                <p className='text-color-gray text-xs md:text-sm'>{props.category.toUpperCase()}</p>
                <div className='flex justify-between w-full'>
                    <h2 className='text-black'>{transformCase(props.owner)}</h2>
                    <div className='flex'>
                        <img src= {timer} alt = "tempo estimado da receita" className='h-4 w-4 self-center mr-1'/>
                        <h2 className='m-0'>{props.hours}h{formattedMinutes(props.minutes)}min</h2>
                    </div>
                </div>
                <p className='text-color-gray text-xs md:text-sm'>{formatDescription(props.description)}</p>
                <div className='flex justify-between mt-auto md:pt-8'>
                    <img src= {liked} className='hidden md:block'/>
                    <div className='flex'>
                        {props.person1 !== undefined && (
                            <div className='w-6 h-6 rounded-full overflow-hidden flex items-center justify-center'>
                                <img src= {props.person1} alt="" className='w-full h-full object-cover'/>
                            </div>
                        )}
                        {props.person2 !== undefined && (
                            <div className='w-6 h-6 rounded-full overflow-hidden flex items-center justify-center -ml-2'>
                                <img src= {props.person2} alt="" className='w-full h-full object-cover'/>
                            </div>
                        )}
                        {props.person3 !== undefined && (
                            <div className='w-6 h-6 rounded-full overflow-hidden flex items-center justify-center -ml-2'>
                                <img src= {props.person3} alt="" className='w-full h-full object-cover'/>
                            </div>
                        )}
                        {props.moreLikes !== undefined && (
                            <div className='w-6 h-6 rounded-full -ml-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] bg-white'>
                                <span className='moreLikes w-full h-full flex items-center justify-start'>+{props.moreLikes}</span>
                            </div>
                        )}
                        {props.person1 !== undefined && (
                            <div className='self-end mt-4 -ml-2 relative z-2'>
                                <img src= {tt} alt="" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default recipe;