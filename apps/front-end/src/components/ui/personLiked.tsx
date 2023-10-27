import React from "react"

interface personLikedProps {
    personPhoto: string
}

const PersonLiked: React.FC<personLikedProps> = props => {
    return (
        <div className='w-6 h-6 rounded-full overflow-hidden flex items-center justify-center -ml-2'>
            <img src= {props.personPhoto} alt="" className='w-full h-full object-cover'/>
        </div>
    )
}

export default PersonLiked