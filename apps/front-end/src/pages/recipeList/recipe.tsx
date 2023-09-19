import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface RecipeProps {
    image: string;
    imageAlt: string;
    title: string;
    category: string;
    owner: string;
    time: string;
    description: string;
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
        <div className="w-1/3 p-8">
            <img src = {props.image} alt = {props.imageAlt} />
            <h1 className='text-color-orange font-medium'>{transformCase(props.title)}</h1>
            <p className='text-color-gray '>{props.category.toUpperCase()}</p>
            <div className='flex justify-between'>
                <h2 className='text-black'>{transformCase(props.owner)}</h2>
                <h2>{props.time}</h2>
            </div>
            <p className='text-color-gray'>{formatDescription(props.description)}</p>
        </div>
    )
}

export default recipe;