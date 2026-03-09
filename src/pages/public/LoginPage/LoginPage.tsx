import { useState } from "react"
import { useNavigate } from "react-router-dom"
import HeaderLanding from "../../../components/landing/HeaderLanding"
import FooterLanding from "../../../components/landing/FooterLanding"
import "./LoginPage.css"
import robot from "../../../assets/images/Robot2.png"
import { useEffect } from "react"


const LoginPage = () => {



     useEffect(() => {
        document.title = "Inicio de sesión"
      }, [])
  

  const navigate = useNavigate()

  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e:any) => {

    e.preventDefault()

    try{

      setLoading(true)

      const response = await fetch(
        "http://3.19.63.85:3000/api/auth/sign-in",
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

      if(response.ok){

        // guardar token
        localStorage.setItem("token", data.token.token)

        // guardar usuario
        localStorage.setItem("user", JSON.stringify(data.user))

        // redirigir
        navigate("/home")

      }else{

        alert(data.message || "Credenciales incorrectas")

      }

    }catch(error){

      console.error(error)
      alert("Error al conectar con el servidor")

    }finally{

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
                <input
                  type="email"
                  placeholder="ejemplo@dominio.com"
                  value={correo}
                  onChange={(e)=>setCorreo(e.target.value)}
                  required
                />
              </div>

              <div className="login-field">
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={contrasena}
                  onChange={(e)=>setContrasena(e.target.value)}
                  required
                />
              </div>

              <button className="login-button" disabled={loading}>
                {loading ? "Iniciando..." : "Iniciar sesión"}
              </button>

            </form>

            <p className="login-register">
              ¿No tienes una cuenta?
              <a href="/register">Crear cuenta</a>
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