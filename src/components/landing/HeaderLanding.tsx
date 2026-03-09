const HeaderLanding = () => {
  return (
    <header className="header">

      <div className="logo">
        PANAL
      </div>

      <div className="header-right">

        <nav className="nav">
          <span className="nav-item">Inicio</span>
          <span className="nav-item">Características</span>
          <span className="nav-item">Precios</span>
          <span className="nav-item">Soporte</span>
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