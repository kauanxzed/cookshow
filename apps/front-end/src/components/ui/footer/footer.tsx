import { Link } from 'react-router-dom'

//Commit apenas para arrumar o autor dos commits feitos em sala de aula, pois no computador da cesumar estava configurado o nome de outro usuário.

function Footer() {
  return (
    <footer className="bottom-0 w-full bg-white p-5 text-black">
      <div className="container mx-auto text-center">
        <div className="mb-2">
          © 2023 CookShow - Todos os direitos reservados
          {/*<img src={Logo} alt="CookShow" className="h-12 w-auto inline-block" />*/}
        </div>
        <div className="mb-2">Cozinhe do seu jeito!</div>
        <div className="whitespace-nowrap">
          <Link to="/quem-somos">
            <a
              href="!#"
              className="mx-1 text-sm hover:text-orange-500 sm:mx-2 sm:text-base"
            >
              Quem Somos
            </a>
          </Link>
          <Link to="/termos">
            {' '}
            <a
              href="!#"
              className="mx-1 text-sm hover:text-orange-500 sm:mx-2 sm:text-base"
            >
              Termos
            </a>
          </Link>
          <Link to="/privacidade">
            {' '}
            <a
              href="!#"
              className="mx-1 text-sm hover:text-orange-500 sm:mx-2 sm:text-base"
            >
              Privacidade
            </a>
          </Link>
          <Link to="/fale-conosco">
            {' '}
            <a
              href="!#"
              className="mx-1 text-sm hover:text-orange-500 sm:mx-2 sm:text-base"
            >
              Fale Conosco
            </a>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
