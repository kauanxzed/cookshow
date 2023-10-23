import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebook } from 'react-icons/gr';
import Logo from '../../assets/images/background.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  /*Validação do email através de Regex*/
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(email).toLowerCase());
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      alert('Por favor, insira um email válido.');
      return;
    }
    const url = "/api/auth"

    axios.post(url, {
      email: email,
      senha: password
    },{
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
      }
    }) 
    .then().catch(()=> alert('Erro na requisição!'));
  }

  return (
    <div className="flex overflow-hidden lg:flex-row h-screen">
      <div className="hidden lg:flex lg:w-2/3">
        <img
          src={Logo}
          alt="Descrição da imagem"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:w-1/3 flex flex-col items-start mt-14 ml-9 lg:items-start lg:justify-center lg:mt-0 lg:px-6 h-full md:w-1/2 sm:w-full sm:mt-6 sm:ml-6">
        <div className="flex flex-col items-start lg:items-start w-full lg:h-full justify-center space-y-6 py-6 lg:py-0 lg:pt-0 lg:mb-20">
          <h1 className="text-3xl mb-9 font-bold text-orange-400 font-orelega lg:mt-0 lg:mb-6 lg:self-center">
            <span className="text-3xl mb-9 ml-20 font-bold text-orange-400 lg:ml-0 lg:hidden">
              COOK
            </span>
            <span className="text-3xl mb-9 font-bold text-black lg:hidden">
              SHOW
            </span>
          </h1>
          <p className="text-3xl mb-5 font-bold text-orange-400">
            Bem <br /> vindo!
          </p>
          <div className="mb-4 w-80">
            <label className="block text-orange-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400"
            />
          </div>
          <div className="mb-4 w-80 relative">
            <label className="block text-orange-700 mb-2">Senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-3 bg-gray-100 rounded-lg outline-none focus:outline-orange-400"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-11 cursor-pointer"
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <div className="flex justify-between w-80 mb-4">
            <button
              onClick={handleLogin}
              className="p-2 bg-orange-500 mt-5 text-white rounded-lg w-36 hover:bg-orange-600"
            >
              Login
            </button>
            <Link to="/register">
              <button className="p-2 bg-gray-800 mt-5 text-white rounded-lg w-36 hover:bg-gray-700">
                Cadastre-se
              </button>
            </Link>
          </div>
          <div className="flex space-x-4 mb-4 w-80 justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 accent-orange-600"
              />
              <label className="text-orange-700  mb-1">Lembrar de mim</label>
            </div>
            <a href="/forgot-password" className="text-orange-700">
              Esqueceu a senha?
            </a>
          </div>
          <div className="flex ml-1 mt-12 flex-col space-y-4 mb-4 w-80">
            <button className="flex  items-center p-4 border-2 border-gray-700 bg-white text-black rounded-md w-full hover:bg-gray-300 ">
              <FcGoogle size={20} className="mr-1 ml-12 " />
              Continue com Google
            </button>
            <button className="flex items-center p-4 border-2 border-gray-700 text-black rounded-md w-full hover:bg-gray-300">
              <GrFacebook size={18} color="darkblue" className="mr-1 ml-12" />
              Continue com Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
