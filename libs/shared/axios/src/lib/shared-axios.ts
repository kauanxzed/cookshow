import axios from 'axios'

const token =
  localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')

export const axiosInstance = axios.create({
  baseURL: 'https://cook-show-056b96634c68.herokuapp.com/api/auth',
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
})
