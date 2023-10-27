import React from "react";

interface RatingProps {
    rating: number
}


const Rating: React.FC<RatingProps> = props => {
    const stars = [];
    let rating = +props.rating.toFixed(1)
    for (let i = 1; i <= 5; i++) {
        console.log(rating)
      if(rating > 0.5) {
        console.log("criei estrela cheia")
        rating = rating - 1
        rating = +rating.toFixed(1)
        stars.push(
            <i className="fa-solid fa-star" style={{color: "#ff8c00",}}></i>
        );
        continue;
      } else if(rating >= 0.1){
        console.log("criei meia estrela")
        rating = rating - 0.5
        rating = +rating.toFixed(1)
        stars.push(
            <i className="fa-solid fa-star-half-stroke" style={{color: "#ff8c00",}}></i>
        );
        continue;
      } else {
        console.log("criei estrela vazia")
        stars.push(
            <i className="fa-regular fa-star" style={{color: "#ff8c00",}}></i>
          );
      }
      
    }
    return <div>{stars}</div>;
  }

export default Rating