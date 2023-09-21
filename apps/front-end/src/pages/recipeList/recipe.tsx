import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import timer from "../../assets/images/relogio.png"
import like from "../../assets/images/like.png"
import liked from "../../assets/images/likeInteragido.png"
import person1 from "../../assets/images/person1.png"
import person2 from "../../assets/images/person2.png"
import person3 from "../../assets/images/person3.png"


interface RecipeProps {
    image: string;
    imageAlt: string;
    title: string;
    category: string;
    owner: string;
    time: string;
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
        return description;
    }

    return (
        <div className='w-1/3 p-8'>
            <div className='rounded-md overflow-hidden'>
                <img src = {props.image} alt = {props.imageAlt} />
            </div>
            <h1 className='text-color-orange font-medium'>{transformCase(props.title)}</h1>
            <p className='text-color-gray '>{props.category.toUpperCase()}</p>
            <div className='flex justify-between'>
                <h2 className='text-black'>{transformCase(props.owner)}</h2>
                <div className='flex'>
                    <img src= {timer} alt = "tempo estimado da receita" className='h-4 w-4 self-center mr-1'/>
                    <h2>{props.time}</h2>
                </div>
            </div>
            <p className='text-color-gray'>{formatDescription(props.description)}</p>
            <div className='flex justify-between self-end'>
                <img src= {liked} />
                <div className='flex'>
                    {props.person1 !== undefined && (
                        <img src= {props.person1} alt="" />
                    )}
                    {props.person2 !== undefined && (
                        <img src= {props.person2} alt="" />
                    )}
                    {props.person3 !== undefined && (
                        <img src= {props.person3} alt="" />
                    )}
                    {props.moreLikes !== undefined && (
                        <div><span>+{props.moreLikes}</span></div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default recipe;