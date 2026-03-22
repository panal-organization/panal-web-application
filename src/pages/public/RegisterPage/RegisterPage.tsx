import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import HeaderLanding from "../../../components/landing/HeaderLanding"
import FooterLanding from "../../../components/landing/FooterLanding"

import "./RegisterPage.css"
import robot from "../../../assets/images/Robot3.png"

import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from "react-icons/fi"

const BASE_URL = "https://waggish-unsecludedly-jong.ngrok-free.dev/api";

const RegisterPage = () => {

  useEffect(() => {
    document.title = "Registrarse"
  }, [])

  const navigate = useNavigate()

  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [confirmarContrasena, setConfirmarContrasena] = useState("")
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false)

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e:any) => {
    e.preventDefault()
    setError("")

    if(contrasena !== confirmarContrasena){
      setError("Las contraseñas no coinciden")
      return
    }

    try{
      setLoading(true)

      const response = await fetch(`${BASE_URL}/auth/sign-up`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          nombre,
          correo,
          contrasena,
          rol_id: "699d2f3eb00a373767e0adbf",
          estatus: true,
          foto: ""
        })
      })

      const data = await response.json()

      if(response.ok){
        alert("Cuenta creada correctamente")
        navigate("/login")
      }else{
        setError(data.message || "Error al registrar usuario")
      }

    }catch(error){
      console.error(error)
      setError("Error al conectar con el servidor")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div>

      <HeaderLanding />

      <section className="login-section">

        <div className="register-wrapper">

          {/* PANEL IZQUIERDO */}
          <div className="register-image">
            <div className="register-image-content">
              <h3>Panal</h3>

              <div className="register-illustration">
                <img src={robot} alt="Robot soporte Panal" />
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

              {/* NOMBRE */}
              <div className="login-field">
                <label>Nombre</label>

                <div className="input-container">
                  <FiUser className="input-icon" />

                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e)=>setNombre(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* CORREO */}
              <div className="login-field">
                <label>Correo electrónico</label>

                <div className="input-container">
                  <FiMail className="input-icon" />

                  <input
                    type="email"
                    placeholder="ejemplo@dominio.com"
                    value={correo}
                    onChange={(e)=>setCorreo(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* CONTRASEÑA */}
              <div className="login-field">
                <label>Contraseña</label>

                <div className="input-container">
                  <FiLock className="input-icon" />

                  <input
                    type={mostrarPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={contrasena}
                    onChange={(e)=>setContrasena(e.target.value)}
                    required
                  />

                  <span
                    className="password-toggle"
                    onClick={()=>setMostrarPassword(!mostrarPassword)}
                  >
                    {mostrarPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
              </div>

              {/* CONFIRMAR CONTRASEÑA */}
              <div className="login-field">
                <label>Confirmar contraseña</label>

                <div className="input-container">
                  <FiLock className="input-icon" />

                  <input
                    type={mostrarConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmarContrasena}
                    onChange={(e)=>setConfirmarContrasena(e.target.value)}
                    required
                  />

                  <span
                    className="password-toggle"
                    onClick={()=>setMostrarConfirmPassword(!mostrarConfirmPassword)}
                  >
                    {mostrarConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
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
              <a href="/login">Iniciar sesión</a>
            </p>

          </div>

        </div>

      </section>

      <FooterLanding />

    </div>
  )
}

export default RegisterPage