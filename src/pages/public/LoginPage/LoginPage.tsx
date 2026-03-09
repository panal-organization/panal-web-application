import HeaderLanding from "../../../components/landing/HeaderLanding"
import FooterLanding from "../../../components/landing/FooterLanding"
import "./LoginPage.css"

const LoginPage = () => {
  return (
    <div>

      <HeaderLanding />

      <section className="login-section">

        <div className="login-container">

          <h1 className="login-title">Iniciar sesión</h1>
          <p className="login-subtitle">
            Accede a tu organización en Panal
          </p>

          <form className="login-form">

            <div className="login-field">
              <label>Correo electrónico</label>
              <input 
                type="email"
                placeholder="ejemplo@empresa.com"
                required
              />
            </div>

            <div className="login-field">
              <label>Contraseña</label>
              <input 
                type="password"
                placeholder="********"
                required
              />
            </div>

            <button className="login-button">
              Iniciar sesión
            </button>

          </form>

          <p className="login-register">
            ¿No tienes cuenta? <a href="/register">Regístrate</a>
          </p>

        </div>

      </section>

      <FooterLanding />

    </div>
  )
}

export default LoginPage