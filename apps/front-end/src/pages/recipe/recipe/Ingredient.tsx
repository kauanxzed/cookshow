import React from 'react'

interface IngredientProps {
  name: string
}

const Ingredient: React.FC<IngredientProps> = (props) => {
  return (
    <div className="m-1 w-fit rounded-xl bg-orange-500 px-1 text-sm text-white md:m-0.5 md:px-2">
      <p>{props.name}</p>
    </div>
  )
}

export default Ingredient

