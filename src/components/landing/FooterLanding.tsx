import panal from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

function FooterLanding() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-col">
          <h3>Panal®</h3>
          <p className="footer-description">
            Gestión inteligente de soporte técnico con IA, desde cualquier plataforma.
          </p>
        </div>

        <div className="footer-col">
          <h4>Explora</h4>

          <ul>

            <li>
              <Link to="/landing" className="footer-link">
                Inicio
              </Link>
            </li>

            <li>
              <Link to="/about" className="footer-link">
                ¿Quiénes somos?
              </Link>
            </li>

            <li>
              <Link to="/features" className="footer-link">
                Características
              </Link>
            </li>

            <li>
              <Link to="/pricing" className="footer-link">
                Suscripciones
              </Link>
            </li>

            <li>
              <Link to="/contact" className="footer-link">
                Contáctanos
              </Link>
            </li>

          </ul>
        </div>  

        <div className="footer-col">
          <h4>Medios de contacto</h4>
          <ul>
            <li>soporte@panal.app</li>
            <li>+52 664 813 9370</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Síguenos</h4>

          <ul className="socials">
            <li><FaTwitter /> Twitter</li>
            <li><FaLinkedin /> LinkedIn</li>
            <li><FaGithub /> GitHub</li>
          </ul>

        </div>

      </div>

      <img src={panal} className="footer-bg" alt="panal background"/>

      <div className="footer-bottom">
        © 2026 Panal - 10C / IDGS - Todos los derechos reservados
      </div>

    </footer>
  )
}

export default FooterLanding