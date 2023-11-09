import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Imagem from '../../assets/images/background.png'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('')
  const [showPasswordTip, setShowPasswordTip] = useState(false)

  //Commit apenas para arrumar o autor dos commits feitos em sala de aula, pois no computador da cesumar estava configurado o nome de outro usuário.

  // Hook para navegar entre páginas
  const navigate = useNavigate()

  // Função para validar o formato do email
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(String(email).toLowerCase())
  }

  // Função para validar o nome
  const validateName = (name: string) => {
    const regex = /[a-zA-Z\u00C0-\u00FF ]+/i
    return regex.test(name)
  }

  // Função para validar a força da senha
  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*?.%+=_/`,><~^()[;&@#])[0-9a-zA-Z$*?.%+=_/`,><~^()[;&@#]{6,}$/
    return regex.test(password)
  }

  // Função chamada quando o usuário clica no botão de registro
  const handleRegister = () => {
    if (!name) {
      setNameError('O nome não pode ser vazio!')
      return
    }

    if (!validateEmail(email)) {
      setEmailError('Insira um email válido!')
      return
    }
    const url = '/api/user'

    axios
      .post(
        url,
        {
          usuario: name,
          email: email,
          senha: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
      .then((response) => {
        if (response.status === 201) {
          alert('Registro bem-sucedido!')
          navigate('/')
        } else {
          alert('Erro no registro!')
        }
      })
      .catch(() => alert('Erro na requisição!'))

    if (!validatePassword(password)) {
      setPasswordError(
        'A senha deve ter no mínimo 6 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
      )
      return
    }

    if (password !== passwordConfirmation) {
      setPasswordConfirmationError('As senhas devem ser iguais.')
      return
    }

    alert('Registro bem-sucedido!')
    navigate('/confirmation-register')
  }
  return (
    <div className="flex h-screen overflow-hidden lg:flex-row">
      <div className="hidden lg:flex lg:w-2/3">
        <img src={Imagem} alt="Logo" className="h-full w-full object-cover" />
      </div>
      <div className="mt-14 ml-9 flex h-full scale-[0.85] flex-col items-start sm:mt-6 sm:ml-6 sm:w-full md:w-1/2 lg:mt-0 lg:w-1/3 lg:items-start lg:justify-center lg:px-6">
        <div className="flex w-full flex-col items-start justify-center space-y-4 py-6 lg:mb-20 lg:h-full lg:items-start lg:py-0 lg:pt-0">
          <h1 className="font-orelega mb-9 text-3xl font-bold text-orange-400 lg:mt-0 lg:mb-6 lg:self-center">
            <span className="mb-9 ml-20 text-3xl font-bold text-orange-400 lg:ml-0 lg:hidden">
              COOK
            </span>
            <span className="mb-9 text-3xl font-bold text-black lg:hidden">
              SHOW
            </span>
          </h1>
          <p className="py-3 text-3xl font-bold text-orange-400">
            Cadastre-se!
          </p>
          <div className="mb-0 w-80">
            <label className="mb-2 block text-orange-700">Nome</label>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setNameError('')
                if (!validateName(e.target.value)) {
                  setNameError('O nome deve ser válido!')
                }
              }}
              required
              className="block w-full rounded-lg bg-gray-100 p-3 outline-none focus:outline-orange-400"
            />
            {nameError && <p className="text-sm text-red-600">{nameError}</p>}
          </div>
          <div className="mb-0 w-80">
            <label className="mb-2 block text-orange-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailError('')
                if (!validateEmail(e.target.value)) {
                  setEmailError('Insira um email válido!')
                }
              }}
              required
              className="block w-full rounded-lg bg-gray-100 p-3 outline-none focus:outline-orange-400"
            />
            {emailError && <p className="text-sm text-red-600">{emailError}</p>}
          </div>
          <div className="relative mb-0 w-80">
            <label className="mb-2 block text-orange-700">
              Senha
              <span
                role="img"
                aria-label="Ponto de interrogação"
                className="ml-2 cursor-pointer text-blue-600"
                onMouseOver={() => setShowPasswordTip(true)}
                onMouseOut={() => setShowPasswordTip(false)}
              >
                ❓
              </span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="**********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setPasswordError('')
                if (!validatePassword(e.target.value)) {
                  setPasswordError(
                    'A senha deve ter no mínimo 6 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
                  )
                }
              }}
              required
              className="block w-full rounded-lg bg-gray-100 p-3 outline-none focus:outline-orange-400"
            />
            {showPasswordTip && (
              <p
                className="absolute rounded border bg-white p-1 text-sm text-black"
                style={{
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1000,
                }}
              >
                A senha deve ter no mínimo 6 caracteres, uma letra maiúscula,
                uma letra minúscula, um número e um caractere especial.
              </p>
            )}
            {passwordError && (
              <p className="text-sm text-red-600">{passwordError}</p>
            )}

            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-11 cursor-pointer"
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <div className="relative mb-0 w-80">
            <label className="mb-2 block text-orange-700">
              Confirme sua senha
            </label>
            <input
              type={showPasswordConfirmation ? 'text' : 'password'}
              placeholder="**********"
              value={passwordConfirmation}
              onChange={(e) => {
                setPasswordConfirmation(e.target.value)
                if (e.target.value !== password) {
                  setPasswordConfirmationError('As senhas não conferem!')
                } else {
                  setPasswordConfirmationError('')
                }
              }}
              required
              className="block w-full rounded-lg bg-gray-100 p-3 outline-none focus:outline-orange-400"
            />
            {passwordConfirmationError && (
              <p className="text-sm text-red-600">
                {passwordConfirmationError}
              </p>
            )}
            <span
              onClick={() => setShowPasswordConfirmation((prev) => !prev)}
              className="absolute right-4 top-11 cursor-pointer"
            >
              {showPasswordConfirmation ? '🙈' : '👁️'}
            </span>
          </div>
          <div className="mb-4 w-80">
            <button
              onClick={handleRegister}
              className="px-22 mt-5 w-full rounded-md bg-gray-800 p-1 py-2 text-white hover:bg-gray-700"
            >
              Confirmar cadastro
            </button>
          </div>
          <div className="mb-4 flex w-80 justify-center space-x-1">
            <p>Já tenho uma conta!</p>
            <a href="/perfil" className="text-orange-700 hover:text-orange-800">
              Login
            </a>
          </div>
          <div className="ml-1 mt-6 mb-0 flex w-80 flex-col space-y-0">
            <p className="text-sm">
              {' '}
              COOKSHOW processa os dados coletados para a criação da sua área de
              usuário. Para saber mais sobre como gerenciar seus dados pessoais
              e exercer seus direitos, consulte nossa{' '}
              <a
                href="/terms-of-use"
                className="text-orange-700 hover:text-orange-800"
              >
                Política de Proteção de Dados Pessoais.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
