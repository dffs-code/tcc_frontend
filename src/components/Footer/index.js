import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { RiFacebookCircleFill, RiInstagramFill } from 'react-icons/ri';

import groupFlag from '../../img/groupFlag.svg';
import './style.css';

export default function Footer() {
  return(
    <footer className="footer-container" id="footer_section">
      <div className="content">
        <div className="row d-flex align-items-center">
          <div className={isMobile ? "col-12 text-center mt-2" : "col-4 text-left"}>
            <h5><b>Ensina-me</b></h5>
            <Link to="/register">Inscrever-se</Link>
            <Link to="/explorar">Explorar professores</Link>
            <Link to="/ajuda">Ajuda</Link>
          </div>
          <div className={isMobile ? "col-12 text-center mt-5" : "col-4 text-center"}>
            <Link to="/sobre">
              <img src={groupFlag} alt="Juntos até o fim" /><br/>
              Junte-se a nós na universalização do ensino!
            </Link>
          </div>
          <div className={isMobile ? "col-12 text-center mt-5" : "col-4 text-right"}>
            <h5><b>Assuntos mais buscados</b></h5>
            <Link to="/explorar?categoryId=65">Ciências Humanas</Link>
            <Link to="/explorar?categoryId=5">Programação</Link>
            <Link to="/explorar?categoryId=55">Ciências Exatas</Link>
          </div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col-12" id="sociais_footer">
            <div className="d-flex flex-wrap justify-content-center text-center mb-1">
              <h5 className="text-center"><b>Nossas redes</b></h5>
              <div className="w-100 d-flex justify-content-center mb-3 social_footer">
                <a href="https://web.facebook.com/ensina.me.br" target="_blank" rel="noreferrer">
                  <RiFacebookCircleFill className="mr-2"/>
                </a>
                <a href="https://www.instagram.com/ensina.me.br/" target="_blank" rel="noreferrer">
                  <RiInstagramFill />
                </a>
              </div>
              &#169; Ensina.me 2021 - Vamos juntos revolucionar e universalizar o ensino no Brasil.<br/>
              

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}



