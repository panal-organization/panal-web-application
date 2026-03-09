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
            <li>Inicio</li>
             <li>¿Quiénes somos?</li>
            <li>Características</li>
            <li>Precios</li>
            <li>Contáctanos </li>
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

      <div className="footer-bottom">
         © 2026 Panal - 10C / IDGS - Todos los derechos reservados
      </div>
    </footer>
  )
}

export default FooterLanding
