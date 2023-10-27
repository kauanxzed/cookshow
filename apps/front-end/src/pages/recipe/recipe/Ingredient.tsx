import React from "react";

interface IngredientProps{
    name: string,
}

const Ingredient: React.FC<IngredientProps> = props =>{
    return (
        <div className="w-fit text-sm bg-orange-500 text-white rounded-xl px-1 m-1 md:px-2 md:m-0.5">
            <p>{props.name}</p>
        </div>
    )
}

export default Ingredient