import axios from 'axios'
import { useEffect, useState } from 'react'

type UserPayloadType = {
  userId: string
  username: string
}

function useGetUserPayload() {
  const [payload, setPayload] = useState<UserPayloadType | null>(null)

  const token =
    localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')

  const axiosInstance = axios.create({
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  useEffect(() => {
    try {
      axiosInstance.get('/api/auth').then((res) => {
        const data = res.data as UserPayloadType
        setPayload(data)
      })
    } catch (error) {
      alert('usuario não logado')
    }
  }, [])

  return payload
}

export { useGetUserPayload }
