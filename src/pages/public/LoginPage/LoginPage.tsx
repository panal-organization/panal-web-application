import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import HeaderLanding from "../../../components/landing/HeaderLanding"
import FooterLanding from "../../../components/landing/FooterLanding"
import "./LoginPage.css"
import robot from "../../../assets/images/Robot2.png"
import { useEffect } from "react"

import { useAuth } from "../../../context/AuthContext"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"

const LoginPage = () => {



  useEffect(() => {
    document.title = "Inicio de sesión"
  }, [])


  const navigate = useNavigate()


  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleLogin = async (e: any) => {

    e.preventDefault()

    try {

      setLoading(true)

      const response = await fetch(
        "https://waggish-unsecludedly-jong.ngrok-free.dev/api/auth/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            correo,
            contrasena
          })
        }
      )

      const data = await response.json()

      if (response.ok) {

        login(data.token.token, data.user)

        // redirigir
        navigate("/dashboard")

      } else {

        alert(data.message || "Credenciales incorrectas")

      }

    } catch (error) {

      console.error(error)
      alert("Error al conectar con el servidor")

    } finally {

      setLoading(false)

    }

  }

  return (
    <div>

      <HeaderLanding />

      <section className="login-section">

        <div className="login-wrapper">

          {/* LOGIN */}
          <div className="login-card">

            <h2 className="login-title">Iniciar sesión</h2>

            <p className="login-subtitle">
              Accede a tu cuenta
            </p>

            <form className="login-form" onSubmit={handleLogin}>


              <div className="login-field">
                <label>Correo electrónico</label>

                <div className="input-container">
                  <FiMail className="input-icon" />

                  <input
                    type="email"
                    placeholder="ejemplo@dominio.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="login-field">
                <label>Contraseña</label>

                <div className="input-container">
                  <FiLock className="input-icon" />

                  <input
                    type={mostrarPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                  />

                  <span
                    className="password-toggle"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                  >
                    {mostrarPassword ? <FiEyeOff /> : <FiEye />}
                  </span>

                </div>
              </div>
              <button className="login-button" disabled={loading}>
                {loading ? "Iniciando..." : "Iniciar sesión"}
              </button>

            </form>

            <p className="login-register">
              ¿No tienes una cuenta?
              <Link to="/register">Crear cuenta</Link>
            </p>

          </div>

          {/* PANEL DERECHO */}
          <div className="login-image">

            <div className="login-image-content">

              <h3>Panal</h3>

              <div className="login-illustration">

                <img
                  src={robot}
                  alt="Robot soporte Panal"
                />

              </div>

              <p>
                "<i>Tu sistema de soporte inteligente</i>"
              </p>

            </div>

          </div>

        </div>

      </section>

      <FooterLanding />

    </div>
  )
}

export default LoginPage