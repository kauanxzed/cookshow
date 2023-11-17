import { useGetUserPayload } from '@cook-show/hooks'
import { axiosInstance } from '@cook-show/shared/axios'
import React, { useEffect, useState } from 'react'

interface RatingProps {
  id: string
  className?: string
  count: number
  value: number
  color?: string
  hoverColor?: string
  activeColor?: string
  size?: number
  edit?: boolean
  isHalf?: boolean
  onChange?: (value: number) => void
  emptyIcon?: React.ReactElement
  halfIcon?: React.ReactElement
  fullIcon?: React.ReactElement
}

interface IconProps {
  size?: number
  color?: string
}

const FullStar = ({ size = 24, color = '#000000' }: IconProps) => {
  return (
    <div style={{ color: color }}>
      <svg height={size} viewBox="0 0 24 24">
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill="currentColor"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>
  )
}

const HalfStar = ({ size = 24, color = '#000000' }: IconProps) => {
  return (
    <div style={{ color: color }}>
      <svg height={size} viewBox="0 0 24 24">
        <path
          d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
          fill="currentColor"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>
  )
}

const EmptyStar = ({ size = 24, color = '#000000' }: IconProps) => {
  return (
    <div style={{ color: color }}>
      <svg height={size} viewBox="0 0 24 24">
        <path
          d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
          fill="currentColor"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>
  )
}

export const Rating: React.FC<RatingProps> = ({
  id,
  className,
  count,
  value,
  color = '#ffd700',
  hoverColor = '#ffc107',
  activeColor = '#ffc107',
  size = 30,
  edit = false,
  isHalf = true,
  onChange,
  emptyIcon = <EmptyStar />,
  halfIcon = <HalfStar />,
  fullIcon = <FullStar />,
}) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined)
  const payload = useGetUserPayload()
  const [rating, setRating] = useState(null)

  useEffect(() => {
    if (!payload) return
    const getInteraction = async () => {
      const res = await axiosInstance.get(
        '/api/recipe/' + id + '/user/' + payload.userId + '/interaction',
      )
      if (onChange) onChange(res.data.avaliacao)
    }
    getInteraction()
  }, [id, payload])

  const handleMouseMove = (index: number) => {
    if (!edit) return
    setHoverValue(index)
  }

  const handleMouseLeave = () => {
    if (!edit) return
    setHoverValue(undefined)
  }

  const getRatingRecipe = async () => {
    try {
      const res = await axiosInstance.get(`/api/recipe/${id}/rating`)
      return res.data // Pode ser necessário ajustar isso dependendo da estrutura da resposta
    } catch (error) {
      console.error('Erro ao obter a classificação da receita:', error)
      throw error // Ou manipule o erro de outra maneira, dependendo dos requisitos
    }
  }

  const handleClick = async (index: number) => {
    if (!edit) return
    if (onChange) onChange(index + 1)
    if (!payload) return
    axiosInstance
      .get('/api/recipe/' + id + '/user/' + payload.userId + '/interaction')
      .then((res) => {
        if (res.data) {
          axiosInstance.put(
            '/api/recipe/' + id + '/user/' + payload?.userId + '/rating',
            {
              avaliacao: index + 1,
            },
          )
        } else {
          if (!payload) return
          axiosInstance.post('/api/recipe/' + id + '/rating', {
            id_usuario: payload.userId,
            id_receita: id,
            avaliacao: index + 1,
          })
        }
      })
  }

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await getRatingRecipe()
        setRating(res)
      } catch (error) {
        console.error('Erro ao obter a classificação da receita:', error)
      }
    }
    fetchRating()
  }, [handleClick])

  const stars = []

  for (let i = 0; i < count; i++) {
    let star: React.ReactElement
    if (isHalf && value - i > 0 && value - i < 1) {
      star = halfIcon
    } else if (i < value) {
      star = fullIcon
    } else {
      star = emptyIcon
    }

    if (hoverValue !== undefined) {
      if (i <= hoverValue) {
        star = fullIcon
      }
    }

    stars.push(
      <div
        key={i}
        style={{ cursor: 'pointer' }}
        onMouseMove={() => handleMouseMove(i)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(i)}
      >
        {React.cloneElement(star, {
          size: size,
          color:
            i <= Number(hoverValue)
              ? hoverColor
              : i < value
              ? activeColor
              : color,
        })}
      </div>,
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <p className="mr-2">Nota: </p>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-solid border-orange-500 text-xs font-bold">
          {Number.isInteger(rating) ? `${rating}.0` : rating}/5
        </div>
      </div>
      <div className={`rating ${className}`}>{stars}</div>
    </div>
  )
}
