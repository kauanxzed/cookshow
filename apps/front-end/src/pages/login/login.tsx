import { useState } from 'react'
import Logo from '../../assets/images/background.png'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '@cook-show/shared/axios'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  /*Validação do email através de Regex*/
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(String(email).toLowerCase())
  }

  const handleLogin = () => {
    if (!validateEmail(email)) {
      alert('Por favor, insira um email válido.')
      return
    }
    const url = 'https://cook-show-056b96634c68.herokuapp.com/api/auth'

    axiosInstance
      .post(url, {
        email: email,
        senha: password,
      })
      .then((data) => {
        if (rememberMe) localStorage.setItem('jwtToken', data.data)
        else sessionStorage.setItem('jwtToken', data.data)
      })
      .then(() => navigate('/'))
      .catch(() => alert('Erro na requisição!'))
  }

  return (
    <div className="flex h-screen overflow-hidden lg:flex-row">
      <div className="hidden lg:flex lg:w-2/3">
        <img
          src={Logo}
          alt="Descrição da imagem"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-14 ml-9 flex h-full flex-col items-start sm:mt-6 sm:ml-6 sm:w-full md:w-1/2 lg:mt-0 lg:w-1/3 lg:items-start lg:justify-center lg:px-6">
        <div className="flex w-full flex-col items-start justify-center space-y-6 py-6 lg:mb-20 lg:h-full lg:items-start lg:py-0 lg:pt-0">
          <h1 className="font-orelega mb-9 text-3xl font-bold text-orange-400 lg:mt-0 lg:mb-6 lg:self-center">
            <span className="mb-9 ml-20 text-3xl font-bold text-orange-400 lg:ml-0 lg:hidden">
              COOK
            </span>
            <span className="mb-9 text-3xl font-bold text-black lg:hidden">
              SHOW
            </span>
          </h1>
          <p className="mb-5 text-3xl font-bold text-orange-400">
            Bem <br /> vindo!
          </p>
          <div className="mb-4 w-80">
            <label className="mb-2 block text-orange-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-lg border-none bg-gray-100 p-3 outline-none focus:outline-orange-400 focus:ring-0"
            />
          </div>
          <div className="relative mb-4 w-80">
            <label className="mb-2 block text-orange-700 ">Senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-lg border-none bg-gray-100 p-3 outline-none focus:outline-orange-400 focus:ring-0"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-11 cursor-pointer"
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <div className="mb-4 flex w-80 justify-between">
            <button
              onClick={handleLogin}
              className="mt-5 w-36 rounded-lg bg-orange-500 p-2 text-white hover:bg-orange-600"
            >
              Login
            </button>
            <a href="/register">
              <button className="mt-5 w-36 rounded-lg bg-gray-800 p-2 text-white hover:bg-gray-700">
                Cadastre-se
              </button>
            </a>
          </div>
          <div className="mb-4 flex w-80 justify-between space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 accent-orange-600"
              />
              <label className="mb-1  text-orange-700">Lembrar de mim</label>
            </div>
            <a href="/forgot-password" className="text-orange-700">
              Esqueceu a senha?
            </a>
          </div>
          <div className="ml-1 mt-12 mb-4 flex w-80 flex-col space-y-4"></div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
