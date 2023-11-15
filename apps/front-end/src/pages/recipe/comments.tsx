import React, { FormEvent, useState, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import axios from 'axios'
import { CommentType } from './types/comment.type'

interface CommentsProps {
  comments: Array<CommentType>
}

const token =
  localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
})

const Comments: React.FC<CommentsProps> = (props) => {
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState({
    comment: '',
  })
  const [userNames, setUserNames] = useState<string[]>([])

  const getUserName = async (userId: any) => {
    try {
      console.log('Obtendo nome do usuário para o userId:', userId)
      const response = await axiosInstance.get(`/api/user/${userId}`)
      console.log('Resposta do servidor:', response)

      if (response?.data?.usuario) {
        console.log('Nome do usuário obtido:', response.data.usuario)
        return response.data.usuario
      } else {
        console.error('Dados do usuário não encontrados na resposta:', response)
        return 'Nome do usuário não encontrado'
      }
    } catch (error) {
      console.error('Erro ao obter nome do usuário:', error)
      return 'Nome do usuário não encontrado'
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const inputValue = comment.trim()
    if (!inputValue) {
      setComment('')
      handleFieldChange('comment', 'O campo deve conter ao menos um caracter')
      return
    }

    const userPayload = await getPayloadUser()
    const userName = userPayload?.username || 'Nome do usuário não encontrado'

    window.alert(`Comentário de ${userName}: ${inputValue}`)
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

  async function getPayloadUser() {
    try {
      const response = await axiosInstance.get('/api/auth')

      if (response && response.data) {
        const userData = response.data

        if (userData && userData.id && userData.usuario) {
          return { userId: userData.id, username: userData.usuario }
        } else {
          console.error('Dados do usuário ausentes ou incorretos na resposta.')
          return null
        }
      } else {
        console.error('Resposta vazia ou sem dados do usuário.')
        return null
      }
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error)
      return null
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
            placeholder="Adiciona um comentario"
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
