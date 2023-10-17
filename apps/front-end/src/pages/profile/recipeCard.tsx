import React from 'react';

interface Recipe {
  imageUrl: string;
  title: string;
  type: string;
  preparationTime: string;
  description: string;
  likesCount: number;
  commentsCount: number;
  favoritesCount: number;
}

interface RecipeCardProps {
  recipe: Recipe;
  showPublicacoes: boolean;
}

function RecipeCard({ recipe, showPublicacoes }: RecipeCardProps) {
  return (
    <div className="p-4 m-2 w-full md:w-2/3 lg:w-2/3">
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <h2 className="text-xl font-bold mt-2 text-orange-600">{recipe.title}</h2>
      <p className="text-gray-400 uppercase">{recipe.type}</p>
      <p className="flex items-center mb-2">
        {' '}
        <i className="far fa-clock text-gray-400 mr-1"></i>{' '}
        {recipe.preparationTime}
      </p>
      <p className="text-gray-400">{recipe.description}</p>
      <div className="flex space-x-4 mt-2">
        {' '}
        <span className="flex items-center">
          <i className="far fa-heart text-red-500 mr-1"></i>{' '}
          <span>{recipe.likesCount}</span>
        </span>
        <span className="flex items-center">
          <i className="far fa-comment text-black mr-1"></i>{' '}
          <span>{recipe.commentsCount}</span>
        </span>
        <span className="flex items-center">
          <i className="far fa-star text-yellow-500 mr-1"></i>{' '}
          <span>{recipe.favoritesCount}</span>
        </span>
      </div>
    </div>
  );
}

export default RecipeCard;
