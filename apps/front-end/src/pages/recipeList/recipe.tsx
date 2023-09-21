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
        <div className='w-1/3 p-8 flex flex-col' >
            <Link to={recipeURL}>
                <div className='rounded-md overflow-hidden'>
                    <img src = {props.image} alt = {props.imageAlt} />
                </div>
            </Link>
            <h1 className='text-color-orange font-medium'>{transformCase(props.title)}</h1>
            <p className='text-color-gray '>{props.category.toUpperCase()}</p>
            <div className='flex justify-between'>
                <h2 className='text-black'>{transformCase(props.owner)}</h2>
                <div className='flex'>
                    <img src= {timer} alt = "tempo estimado da receita" className='h-4 w-4 self-center mr-1'/>
                    <h2 className='m-0'>{props.hours}h{formattedMinutes(props.minutes)}min</h2>
                </div>
            </div>
            <p className='text-color-gray'>{formatDescription(props.description)}</p>
            <div className='flex justify-between mt-auto pt-8'>
                <img src= {liked} />
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
    )
}

export default recipe;