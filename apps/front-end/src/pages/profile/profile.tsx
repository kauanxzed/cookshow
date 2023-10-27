import { useEffect, useState } from 'react';
import RecipeCard from './recipeCard';
import UserProfile from './userProfile';
import axios from 'axios';
import { RecipeType } from './types/recipe.type';
import { Backdrop, CircularProgress } from '@mui/material';

interface Props {
  userId: string;
}

async function getRecipesCreatedByUser(userId: string) {
  userId = '3739c554-34b0-4e1e-915c-ebf93dfd0559';
  try {
    return await axios.get('/api/recipe/user/' + userId);
  } catch (error) {
    alert(error);
  }
}

async function getFavoritesRecipesUser(userId: string) {
  userId = '3739c554-34b0-4e1e-915c-ebf93dfd0559';
  try {
    return await axios.get('/api/recipe/user/' + userId + '/favorites');
  } catch (error) {
    alert(error);
  }
}

function ProfilePage(props: Props) {
  const [showPublicacoes, setShowPublicacoes] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [receitas, setReceitas] = useState<RecipeType[]>([]);

  useEffect(() => {
    if (showPublicacoes) {
      setIsLoading(true);
      getRecipesCreatedByUser(props.userId).then((data) => {
        if (data) setReceitas(data.data);
        setIsLoading(false);
      });
    } else {
      setIsLoading(true);
      getFavoritesRecipesUser(props.userId).then((data) => {
        if (data) setReceitas(data.data);
        setIsLoading(false);
      });
    }
  }, [props.userId, showPublicacoes]);

  const handleShowPublicacoes = async () => {
    setShowPublicacoes(true);
  };

  const handleShowFavoritos = async () => {
    setShowPublicacoes(false);
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {receitas && receitas.length > 0 ? (
              receitas.map((recipe: RecipeType) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center">
                {isLoading ? (
                  <Backdrop
                    sx={{
                      color: '#fff',
                    }}
                    open
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                ) : (
                  <>
                    <div className="bg-transparent border border-orange-600 rounded-full p-5 w-16 h-16 flex items-center justify-center mb-4">
                      <i className="fas fa-plus text-orange-500 text-4xl"></i>
                    </div>
                    <div className="text-center text-gray-700 text-2xl">
                      <p>Você ainda não publicou nenhuma receita.</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
