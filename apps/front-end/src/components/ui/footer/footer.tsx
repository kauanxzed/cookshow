function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-white p-5 text-black">
      <div className="container mx-auto text-center">
        <div className="mb-2">
          © 2023 CookShow - Todos os direitos reservados
          {/*<img src={Logo} alt="CookShow" className="h-12 w-auto inline-block" />*/}
        </div>
        <div className="mb-2">Cozinhe do seu jeito!</div>
        <div className="whitespace-nowrap">
          <a href="/quem-somos">
            <a
              href="!#"
              className="mx-1 text-sm hover:text-orange-500 sm:mx-2 sm:text-base"
            >
              Quem Somos
            </a>
          </a>
          <a href="/termos">
            {' '}
            <a
              href="!#"
              className="mx-1 text-sm hover:text-orange-500 sm:mx-2 sm:text-base"
            >
              Termos
            </a>
          </a>
          <a href="/privacidade">
            {' '}
            <a
              href="!#"
              className="mx-1 text-sm hover:text-orange-500 sm:mx-2 sm:text-base"
            >
              Privacidade
            </a>
          </a>
          <a href="/fale-conosco">
            {' '}
            <a
              href="!#"
              className="mx-1 text-sm hover:text-orange-500 sm:mx-2 sm:text-base"
            >
              Fale Conosco
            </a>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
