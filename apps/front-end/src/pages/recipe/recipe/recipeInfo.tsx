import React from "react";

interface InfoProps{
 info: string,

}
const RecipeInfo: React.FC<InfoProps> = props =>{
    return (
        <p className='md:mr-1 text-sm text-[#666565]'>{props.info}</p>
    )
}

export default RecipeInfo