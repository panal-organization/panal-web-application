import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import HeaderLanding from "../../../components/landing/HeaderLanding"
import FooterLanding from "../../../components/landing/FooterLanding"

import "./RegisterPage.css"

import robot from "../../../assets/images/Robot3.png"

import { useEffect } from "react"

const RegisterPage = () => {




  useEffect(() => {
    document.title = "Registrarse"
  }, [])

  const navigate = useNavigate()

  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [confirmarContrasena, setConfirmarContrasena] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: any) => {

    e.preventDefault()

    setError("")

    if (contrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden")
      return
    }

    try {

      setLoading(true)

      const response = await fetch(
        "https://waggish-unsecludedly-jong.ngrok-free.dev/api/auth/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nombre,
            correo,
            contrasena
          })
        }
      )

      const data = await response.json()

      if (response.ok) {

        alert("Cuenta creada correctamente")
        navigate("/login")

      } else {
        setError(data.message || "Error al registrar usuario")
      }

    } catch (error) {

      console.error(error)
      setError("Error al conectar con el servidor")

    } finally {
      setLoading(false)
    }
  }

  return (
    <div>

      <HeaderLanding />

      <section className="login-section">

        <div className="register-wrapper">

          {/* PANEL IZQUIERDO ROBOT */}

          <div className="register-image">

            <div className="register-image-content">

              <h3>Panal</h3>

              <div className="register-illustration">

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

          {/* FORMULARIO */}

          <div className="register-card">

            <h2 className="login-title">Crear cuenta</h2>

            <p className="login-subtitle">
              Regístrate para comenzar a usar Panal
            </p>

            <form className="login-form" onSubmit={handleRegister}>

              <div className="login-field">
                <label>Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="login-field">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  placeholder="ejemplo@dominio.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>

              <div className="login-field">
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                />
              </div>

              <div className="login-field">
                <label>Confirmar contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmarContrasena}
                  onChange={(e) => setConfirmarContrasena(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="form-error">{error}</p>
              )}

              <button className="login-button" disabled={loading}>
                {loading ? "Creando cuenta..." : "Crear cuenta"}
              </button>

            </form>

            <p className="login-register">
              ¿Ya tienes cuenta?
              <Link to="/login">Iniciar sesión</Link>
            </p>

          </div>

        </div>

      </section>

      <FooterLanding />

    </div>
  )
}

export default RegisterPage