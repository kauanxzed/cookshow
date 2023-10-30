import React from 'react'

interface InfoProps {
  info: string
}
const RecipeInfo: React.FC<InfoProps> = (props) => {
  return <p className="text-sm text-[#666565] md:mr-1">{props.info}</p>
}

export default RecipeInfo

