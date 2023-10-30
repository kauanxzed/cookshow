import React from 'react'

interface personLikedProps {
  personPhoto: string
}

const PersonLiked: React.FC<personLikedProps> = (props) => {
  return (
    <div className="-ml-2 flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
      <img
        src={props.personPhoto}
        alt=""
        className="h-full w-full object-cover"
      />
    </div>
  )
}

export default PersonLiked

