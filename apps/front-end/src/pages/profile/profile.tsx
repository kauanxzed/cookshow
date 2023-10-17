import React, { useState } from 'react';
import { recipes, favoritedRecipes } from '../data';
import RecipeCard from './recipeCard';
import FavoriteRecipeCard from './favoriteRecipeCard';
import UserProfile from './userProfile';

interface User {
  id: number;
  imageUrl: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  showPublicacoes: boolean;
}

interface Recipe {
  id: number;
  imageUrl: string;
  title: string;
  type: string;
  preparationTime: string;
  description: string;
  likesCount: number;
  commentsCount: number;
  favoritesCount: number;
  favoritedByUsers?: User[];
}

interface FavoriteRecipeCardProps {
  recipe: FavoritedRecipe;
  showPublicacoes: boolean;
}

interface FavoritedRecipe
  extends Omit<Recipe, 'likesCount' | 'favoritedByUsers'> {
  favoritedBy: string;
  favoritedByUsers: User[];
}

type AnyRecipe = Recipe | FavoritedRecipe;

function ProfilePage() {
  const [showPublicacoes, setShowPublicacoes] = useState<boolean>(true);

  const handleShowPublicacoes = () => {
    setShowPublicacoes(true);
  };

  const handleShowFavoritos = () => {
    setShowPublicacoes(false);
  };

  const recipesToDisplay: AnyRecipe[] = showPublicacoes
    ? recipes
    : favoritedRecipes;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 lg:w-1/3 xl:w-1/4">
        <UserProfile />
      </div>
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-3/4 p-4 bg-white relative">
        <div className="flex justify-between mx-auto mb-4 max-w-md md:max-w-lg lg:max-w-2xl">
          <div
            className={`flex items-center space-x-2 cursor-pointer ${
              showPublicacoes ? 'text-orange-500' : ''
            }`}
            onClick={handleShowPublicacoes}
          >
            <i className="fas fa-newspaper text-2xl"></i>
            <span>Publicações</span>
          </div>
          <div
            className={`flex items-center space-x-2 cursor-pointer ${
              !showPublicacoes ? 'text-orange-500' : ''
            }`}
            onClick={handleShowFavoritos}
          >
            <i className="far fa-heart text-2xl"></i>
            <span>Favoritos</span>
          </div>
        </div>

        <div className="h-full flex justify-center items-center">
          {showPublicacoes ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {recipesToDisplay.length > 0 ? (
                recipesToDisplay.map((recipe: any) =>
                  'likesCount' in recipe ? (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      showPublicacoes={showPublicacoes}
                    />
                  ) : (
                    <FavoriteRecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      showPublicacoes={showPublicacoes}
                    />
                  )
                )
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-transparent border border-orange-600 rounded-full p-5 w-16 h-16 flex items-center justify-center mb-4">
                    <i className="fas fa-plus text-orange-500 text-4xl"></i>
                  </div>
                  <div className="text-center text-gray-700 text-2xl">
                    <p>Você ainda não publicou nenhuma receita.</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full -mt-6">
              {recipesToDisplay.length > 0 ? (
                recipesToDisplay.map((recipe: any) =>
                  'likesCount' in recipe ? (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      showPublicacoes={showPublicacoes}
                    />
                  ) : (
                    <FavoriteRecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      showPublicacoes={showPublicacoes}
                    />
                  )
                )
              ) : (
                <div className="flex flex-col items-center justify-center -mr-96">
                  <div className="bg-transparent border border-orange-600 rounded-full p-5 w-16 h-16 flex items-center justify-center mb-4">
                    <i className="far fa-heart text-orange-500 text-4xl"></i>
                  </div>
                  <div className="text-center text-gray-700 text-2xl">
                    <p>Você ainda não possui nenhuma receita favoritada.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
