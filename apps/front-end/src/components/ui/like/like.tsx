import React, { useState } from 'react';

const Like: React.FC = ()  => {
  const [stateLike, setStateLike] = useState(false)

  function changeStateLike() {
    setStateLike(!stateLike)
}

  const likes = stateLike ? <i className="fa-solid fa-heart fa-xl" style={{color:"#ff8c00"}}></i> 
                          : <i className="fa-regular fa-heart fa-xl" style={{color:"#ff8c00"}}></i>

  return (
    <div onClick={changeStateLike} className='hidden md:block'> 
      {likes}
    </div>
  )
}

export default Like;
