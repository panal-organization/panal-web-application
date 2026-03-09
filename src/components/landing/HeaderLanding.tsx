import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const HeaderLanding = () => {
  return (
    <header className="header">

      <Link to="/landing" className="logo-container">
        <img src={logo} alt="Panal logo" className="logo-img" />
        <span>Panal®</span>
      </Link>

      <div className="header-right">

        <nav className="nav">
          <span className="nav-item">Inicio</span>
          <span className="nav-item">¿Quiénes somos?</span>
          <span className="nav-item">Características</span>
          <span className="nav-item">Suscripciones</span>
          <span className="nav-item">Contáctanos</span>
        </nav>

        <div className="buttons">
          <button className="login">
            Iniciar sesión
          </button>

          <button className="register">
            Registrarse
          </button>
        </div>

      </div>

    </header>
  )
}

export default HeaderLanding