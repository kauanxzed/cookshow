import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-white text-black p-5 fixed bottom-0 w-full">
            <div className="container mx-auto text-center">
                <div className="mb-2">
                    © 2023 CookShow - Todos os direitos reservados{/*<img src={Logo} alt="CookShow Logo" className="h-12 w-auto inline-block" />*/}
                </div>
                <div className="mb-2">
                    Cozinhe do seu jeito!
                </div>
                <div className="whitespace-nowrap">
                <Link to="/quem-somos"><a href="!#" className="mx-1 sm:mx-2 text-sm sm:text-base hover:text-orange-500">Quem Somos</a></Link>
                <Link to="/termos">  <a href="!#"className="mx-1 sm:mx-2 text-sm sm:text-base hover:text-orange-500">Termos</a></Link>
                <Link to="/privacidade"> <a href="!#" className="mx-1 sm:mx-2 text-sm sm:text-base hover:text-orange-500">Privacidade</a></Link>
                <Link to="/fale-conosco">  <a href="!#" className="mx-1 sm:mx-2 text-sm sm:text-base hover:text-orange-500">Fale Conosco</a></Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

