import { useEffect, useState } from 'react'
import { UserIcon, LogoutIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'

const logOut = () => {
  if (localStorage.getItem('jwtToken')) localStorage.removeItem('jwtToken')
  if (sessionStorage.getItem('jwtToken')) sessionStorage.removeItem('jwtToken')
}

function Header() {
  // Estado para controlar a visibilidade do menu no modo mobile
  const [isOpen, setIsOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState<string | null>()

  useEffect(() => {
    const loggedIn =
      localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')
    setLoggedIn(loggedIn)
  }, [])

  return (
    <div className="bg-white p-5 text-black shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="font-orelega text-3xl font-bold md:text-4xl">
              <span className="text-orange-500">COOK</span>
              <span className="text-black">SHOW</span>
            </h1>
          </Link>
          {/* Menu mobile (visível apenas em telas pequenas) */}
          <div className="relative md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="z-20 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-orange-500 md:h-8 md:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <div
              className={`absolute right-0 z-10 mt-2 rounded-md bg-white shadow-lg ${
                isOpen ? 'block' : 'hidden'
              }`}
            >
              {loggedIn ? (
                <>
                  <Link to="/perfil">
                    <a href="!#" className="block px-4 py-2 text-center">
                      <UserIcon className="mx-auto mb-1 h-4 w-4 text-orange-500 md:h-5 md:w-5" />
                      Perfil
                    </a>
                  </Link>
                  <a
                    href="/"
                    className="block px-4 py-2 text-center"
                    onClick={() => logOut()}
                  >
                    <LogoutIcon className="mx-auto mb-1 h-4 w-4 text-orange-500 md:h-5 md:w-5" />
                    Sair
                  </a>
                </>
              ) : (
                <Link to="/login">
                  <a href="!#" className="block px-4 py-2 text-center">
                    <UserIcon className="mx-auto mb-1 h-4 w-4 text-orange-500 md:h-5 md:w-5" />
                    LogIn
                  </a>
                </Link>
              )}
            </div>
          </div>
          {/* Menu para desktop (visível apenas em telas maiores) */}
          <div className="hidden md:flex">
            {loggedIn ? (
              <>
                <Link to="/perfil">
                  <a
                    href="!#"
                    className="mx-14 text-center text-xl hover:text-orange-600 "
                  >
                    PERFIL
                  </a>
                </Link>
                <Link to="/">
                  <a
                    href="!#"
                    className="mx-14 text-center text-xl hover:text-orange-600 "
                    onClick={() => logOut()}
                  >
                    SAIR
                  </a>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <a
                  href="!#"
                  className="mx-14 text-center text-xl hover:text-orange-600 "
                  onClick={() => logOut()}
                >
                  LOGIN
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
