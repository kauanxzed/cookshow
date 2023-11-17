import React, { FormEvent, useState, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { axiosInstance } from '@cook-show/shared/axios'
import axios from 'axios'
import { CommentType } from './types/comment.type'

interface CommentsProps {
  comments: Array<CommentType>
  recipeId: string
}

const Comments: React.FC<CommentsProps> = (props) => {
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState({
    comment: '',
  })
  const [userNames, setUserNames] = useState<string[]>([])

  const getUserName = async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/api/user/${userId}`)

      if (response?.data?.usuario) {
        return response.data.usuario
      } else {
        return 'Nome do usuário não encontrado'
      }
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const names = await Promise.all(
          props.comments.map(async (comment) =>
            getUserName(comment.id_usuario),
          ),
        )
        setUserNames(names)
      } catch (error) {
        console.error('Erro ao carregar nomes de usuários:', error)
      }
    }

    fetchUserNames()
  }, [props.comments])
  async function getPayloadUser() {
    try {
      const response = await axiosInstance.get('/api/auth')
      const userData = response.data
      if (userData && 'userId' in userData && 'username' in userData) {
        return {
          userId: userData.userId,
          username: userData.username,
        }
      } else {
        console.error(
          'Dados do usuário incompletos ou incorretos na resposta:',
          userData,
        )
        console.error('Tipo de userData:', typeof userData)
        console.error('Chaves em userData:', Object.keys(userData))
        return null
      }
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error)
      return null
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const inputValue = comment.trim()
    if (!inputValue) {
      setComment('')
      handleFieldChange('comment', 'O campo deve conter ao menos um caracter')
      return
    }

    try {
      const userPayload = await getPayloadUser()
      const checkIfRecipeExists = async (
        recipeId: string,
      ): Promise<boolean> => {
        try {
          // Implemente a lógica para verificar se a receita com o ID especificado existe
          const response = await axiosInstance.get(`/api/recipe/${recipeId}`)
          return response.status === 200 // Assume que um status 200 indica que a receita existe
        } catch (error) {
          console.error('Erro ao verificar a existência da receita:', error)
          return false
        }
      }
      if (userPayload) {
        const recipeExists = await checkIfRecipeExists(props.recipeId)
        if (!recipeExists) {
          console.error('A receita com o ID especificado não existe.')
          // Lógica adicional, como exibir uma mensagem ao usuário
          return
        }
        const response = await axiosInstance.post(
          `/api/recipe/${props.recipeId}/comment`,
          {
            id_usuario: userPayload.userId,
            id_receita: props.recipeId,
            mensagem: inputValue,
          },
        )
        window.alert(
          `Comentário de ${userPayload?.username || 'Usuário'}: ${inputValue}`,
        )
      }
    } catch (error) {
      console.error('Erro ao publicar comentário:', error)
      if (axios.isAxiosError(error)) {
        // A partir daqui, o TypeScript deve entender que 'error' é um AxiosError
        console.error('Detalhes do erro:', error.response?.data)
        console.error('Status do erro:', error.response?.status)
        console.error('Headers do erro:', error.response?.headers)
      } else {
        // Se não for um AxiosError, trate-o de acordo com o que você espera
        console.error('Erro desconhecido:', error)
      }
    }
  }
  const handleFieldChange = (fieldName: string, msg: string) => {
    if (msg) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: msg,
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: '',
      }))
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-2">
        <div className="relative flex items-center justify-center">
          <TextareaAutosize
            minRows={1}
            maxRows={2}
            name="comment"
            id="comment"
            placeholder="Adicione um comentário..."
            className="block w-full break-words rounded-lg border-2 border-transparent bg-gray-100 outline-none ring-orange-400 focus:border-orange-400 focus:ring-0 focus:ring-offset-0"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value)
              handleFieldChange('comment', '')
            }}
            required
          />
          <button
            type="submit"
            className="flex w-1/12 items-center justify-center"
          >
            <i
              className="fa-solid fa-paper-plane"
              style={{ color: '#9C4B00' }}
            ></i>
          </button>
        </div>
        {errors.comment && <p className="text-red-500">{errors.comment}</p>}
      </form>
      {props.comments.map((comment, index) => (
        <div
          key={index}
          className="mb-2 border-b border-solid border-[#e6e6e6]"
        >
          <p className="text-sm font-medium text-[#2D3748]">
            {userNames[index] || 'Nome do usuário não encontrado'}
          </p>
          <p className="flex-wrap break-words">{comment.mensagem}</p>
        </div>
      ))}
    </div>
  )
}

export default Comments
