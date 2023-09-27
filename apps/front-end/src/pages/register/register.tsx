import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState('');
  const [showPasswordTip, setShowPasswordTip] = useState(false);

  // Hook para navegar entre páginas
  const navigate = useNavigate();

  // Função para validar o formato do email
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(email).toLowerCase());
  };

  // Função para validar o nome
  const validateName = (name: string) => {
    const regex = /[a-zA-Z\u00C0-\u00FF ]+/i;
    return regex.test(name);
  };

  // Função para validar a força da senha
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  };

  // Função chamada quando o usuário clica no botão de registro
  const handleRegister = () => {
    if (!name) {
      setNameError('O nome não pode ser vazio!');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Insira um email válido!');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.'
      );
      return;
    }

    if (password !== passwordConfirmation) {
      setPasswordConfirmationError('As senhas devem ser iguais.');
      return;
    }

    alert('Registro bem-sucedido!');
    navigate('/confirmation-register');
  };
  return (
    <div className="flex overflow-hidden lg:flex-row h-screen">
      <div className="hidden lg:flex lg:w-2/3">
        <img  alt="Logo" className="object-cover w-full h-full" />
      </div>
      <div className="lg:w-1/3 flex flex-col items-start mt-14 ml-9 lg:items-start lg:justify-center lg:mt-0 lg:px-6 h-full scale-[0.85] md:w-1/2 sm:w-full sm:mt-6 sm:ml-6">
        <div className="flex flex-col items-start lg:items-start w-full lg:h-full justify-center space-y-4 py-6 lg:py-0 lg:pt-0 lg:mb-20">
          <h1 className="text-3xl mb-9 font-bold text-orange-400 font-orelega lg:mt-0 lg:mb-6 lg:self-center">
            <span className="text-3xl mb-9 ml-20 font-bold text-orange-400 lg:ml-0 lg:hidden">
              COOK
            </span>
            <span className="text-3xl mb-9 font-bold text-black lg:hidden">
              SHOW
            </span>
          </h1>
          <p className="text-3xl py-3 font-bold text-orange-400">
            Cadastre-se!
          </p>
          <div className="mb-0 w-80">
            <label className="block text-orange-700 mb-2">Nome</label>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError('');
                if (!validateName(e.target.value)) {
                  setNameError('O nome deve ser válido!');
                }
              }}
              required
              className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400"
            />
            {nameError && <p className="text-red-600 text-sm">{nameError}</p>}
          </div>
          <div className="mb-0 w-80">
            <label className="block text-orange-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
                if (!validateEmail(e.target.value)) {
                  setEmailError('Insira um email válido!');
                }
              }}
              required
              className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400"
            />
            {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
          </div>
          <div className="mb-0 w-80 relative">
            <label className="block text-orange-700 mb-2">
              Senha
              <span
                role="img"
                aria-label="Ponto de interrogação"
                className="ml-2 text-blue-600 cursor-pointer"
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
                setPassword(e.target.value);
                setPasswordError('');
                if (!validatePassword(e.target.value)) {
                  setPasswordError(
                    'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.'
                  );
                }
              }}
              required
              className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400"
            />
            {showPasswordTip && (
              <p
                className="text-black text-sm absolute bg-white p-1 border rounded"
                style={{
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1000,
                }}
              >
                A senha deve ter no mínimo 8 caracteres, uma letra maiúscula e
                um número.
              </p>
            )}
            {passwordError && (
              <p className="text-red-600 text-sm">{passwordError}</p>
            )}

            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-11 cursor-pointer"
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <div className="mb-0 w-80 relative">
            <label className="block text-orange-700 mb-2">
              Confirme sua senha
            </label>
            <input
              type={showPasswordConfirmation ? 'text' : 'password'}
              placeholder="**********"
              value={passwordConfirmation}
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
                if (e.target.value !== password) {
                  setPasswordConfirmationError('As senhas não conferem!');
                } else {
                  setPasswordConfirmationError('');
                }
              }}
              required
              className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400"
            />
            {passwordConfirmationError && (
              <p className="text-red-600 text-sm">
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
          <div className="w-80 mb-4">
            <button
              onClick={handleRegister}
              className="p-1 bg-gray-800 mt-5 py-2 text-white rounded-md w-full px-22 hover:bg-gray-700"
            >
              Confirmar cadastro
            </button>
          </div>
          <div className="flex space-x-1 mb-4 w-80 justify-center">
            <p>Já tenho uma conta!</p>
            <a href="/perfil" className="text-orange-700 hover:text-orange-800">
              Login
            </a>
          </div>
          <div className="flex ml-1 mt-6 flex-col space-y-0 mb-0 w-80">
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
  );
}

export default LoginForm;
