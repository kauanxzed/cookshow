import React from 'react';

interface User {
  id: number;
  imageUrl: string;
}

interface Recipe {
  imageUrl: string;
  title: string;
  type: string;
  preparationTime: string;
  description: string;
  postedBy: string;
  likesCount: number;
  favoritedByUsers: User[];
}

interface FavoriteRecipeCardProps {
  recipe: Recipe;
  showPublicacoes: boolean;
}

function FavoriteRecipeCard({
  recipe,
  showPublicacoes,
}: FavoriteRecipeCardProps) {
  // Limita a exibição de no máximo 3 miniaturas de usuários
  const maxMiniatures = 3;
  const favoritedByUsers = recipe.favoritedByUsers.slice(0, maxMiniatures);
  const remainingCount = Math.max(
    0,
    recipe.favoritedByUsers.length - maxMiniatures
  );

  return (
    <div className="p-4 m-2 relative">
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <h2 className="text-xl font-bold mt-2 text-orange-600">{recipe.title}</h2>
      <p className="text-gray-400 uppercase">{recipe.type}</p>
      <div className="flex items-center mb-2">
        <i className="far fa-clock text-gray-400 mr-1"></i>
        {recipe.preparationTime}
      </div>
      <p className="text-gray-400">{recipe.description}</p>
      <div className="flex items-center mt-2">
        <p>Publicado por: {recipe.postedBy}</p>
      </div>
      <div className="flex items-center mt-2 space-x-2">
        <span className="flex items-center space-x-40">
          <i className="fas fa-heart text-orange-500 text-2xl"></i>
          <span>{recipe.likesCount}</span>
        </span>
        <div className="flex items-center relative">
          {favoritedByUsers.map((user: User, index: number) => (
            <img
              key={user.id}
              src={user.imageUrl}
              alt={`Usuário ${user.id}`}
              className={`w-6 h-6 rounded-full -ml-3`}
              style={{ zIndex: maxMiniatures - index }}
            />
          ))}
          {remainingCount > 0 && (
            <div
              className="w-6 h-6 rounded-full bg-gray-100 text-center text-gray-400 -ml-2"
              style={{ zIndex: 1 }}
            >
              +{remainingCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoriteRecipeCard;
