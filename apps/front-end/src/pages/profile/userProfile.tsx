import { useNavigate } from 'react-router-dom'

interface UserProfileProps {
  userId: string | undefined
  username: string | undefined
}

function UserProfile(props: UserProfileProps) {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col bg-gradient-to-r from-orange-500 to-white py-6">
      <div className="mt-0 flex flex-col items-center space-y-4 p-0 md:mt-32 md:p-10">
        <img
          src={'imagem do usuario'}
          alt={'imagem do usuario'}
          className="relative h-24 w-24 rounded-full object-cover md:h-72 md:w-72"
        />
        <h2 className="text-xl">{props.username}</h2>
        <button
          className="rounded border border-black bg-transparent px-4 py-1 text-black "
          onClick={() => navigate('/perfil/editar')}
        >
          Editar
        </button>
      </div>
    </div>
  )
}

export default UserProfile
