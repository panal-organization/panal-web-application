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
          <Link to="/landing" className="nav-item">
            Inicio
          </Link>


          <Link to="/about" className="nav-item">
            ¿Quiénes somos?
          </Link>




          <Link to="/features" className="nav-item">Características</Link>
          <Link to="/pricing" className="nav-item">Suscripciones</Link>
          {/*<Link to="/contact" className="nav-item">Contáctanos</Link>
          
          Senti muy saturado el header, se cancelaaaa*/}
        </nav>

       <div className="buttons">

  <Link to="/login" className="login">
    Iniciar sesión
  </Link>

  <Link to="/register" className="register">
    Registrarse
  </Link>

</div>

      </div>

    </header>
  )
}

export default HeaderLanding