import { useEffect, useState } from 'react';
import { RecipeType } from './types/recipe.type';
import axios from 'axios';

interface Recipe {
  recipe: RecipeType;
}

async function getLikes(recipeId: string) {
  try {
    return await axios.get('/api/recipe/' + recipeId + '/favoritesQuantity');
  } catch (error) {
    alert(error);
  }
}

async function getRating(recipeId: string) {
  try {
    return await axios.get('/api/recipe/' + recipeId + '/rating');
  } catch (error) {
    alert(error);
  }
}

async function getComments(recipeId: string) {
  try {
    return await axios.get('/api/recipe/' + recipeId + '/commentsQuantity');
  } catch (error) {
    alert(error);
  }
}

function RecipeCard({ recipe }: Recipe) {
  const [likes, setLikes] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [comments, setComments] = useState<number>(0);

  useEffect(() => {
    getLikes(recipe.id).then((data) => {
      if (data) setLikes(data.data);
    });
    getRating(recipe.id).then((data) => {
      if (data) setRating(data.data);
    });
    getComments(recipe.id).then((data) => {
      if (data) setComments(data.data);
    });
  }, [recipe.id]);

  return (
    <div className="p-4 m-2 w-full md:w-2/3 lg:w-2/3">
      <img
        src={recipe.imagem}
        alt={recipe.titulo}
        className="w-full h-48 object-cover"
      />
      <h2 className="text-xl font-bold mt-2 text-orange-600">
        {recipe.titulo}
      </h2>
      <p className="text-gray-400 uppercase">{recipe.subtitulo}</p>
      <p className="flex items-center mb-2">
        {' '}
        <i className="far fa-clock text-gray-400 mr-1"></i>{' '}
        {recipe.tempo_preparo}
      </p>
      <p className="text-gray-400">{recipe.descricao}</p>
      <div className="flex space-x-4 mt-2">
        {' '}
        <span className="flex items-center">
          <i className="far fa-heart text-red-500 mr-1"></i>{' '}
          <span>{likes}</span>
        </span>
        <span className="flex items-center">
          <i className="far fa-comment text-black mr-1"></i>{' '}
          <span>{comments}</span>
        </span>
        <span className="flex items-center">
          <i className="far fa-star text-yellow-500 mr-1"></i>{' '}
          <span>{rating}</span>
        </span>
      </div>
    </div>
  );
}

export default RecipeCard;
