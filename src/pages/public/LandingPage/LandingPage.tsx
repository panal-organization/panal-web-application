import HeaderLanding from "../../../components/landing/HeaderLanding"
import FooterLanding from "../../../components/landing/FooterLanding"
import squares from "../../../assets/images/squares.png"
import usePWAInstall from "../../../hooks/usePWAInstall"

import { FaMobileAlt, FaDesktop } from "react-icons/fa"
import { HiOutlineLightningBolt } from "react-icons/hi"
import { FaBolt, FaUserClock, FaRocket, FaRobot } from "react-icons/fa"

import panalIA from "../../../assets/images/IA.png"
import { Link } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import { useNavigate } from "react-router-dom"

import { useEffect, useRef } from "react"

import "./LandingPage.css"

const LandingPage = () => {

  const { token, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Inicio"
  }, [])

  // 🔹 REDIRECCIÓN AUTOMÁTICA SI YA HAY SESIÓN
  useEffect(() => {

    if (!loading && token) {
      navigate("/dashboard")
    }

  }, [token, loading, navigate])

  const { canInstall, install } = usePWAInstall()

  const statsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            const gauges = document.querySelectorAll(".gauge-fill")

            gauges.forEach((g) => {
              g.classList.add("gauge-animate")
            })

          }

        })

      },
      { threshold: 0.4 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

  }, [])


  return (
    <div className="landing">

      <HeaderLanding />

      {/* HERO */}

      <div className="hero">

        <div className="hero-left">

          <h1>
            El futuro del soporte técnico comienza con
            <br />
            <span>Inteligencia Artificial</span>
          </h1>

          <p>
            Gestiona solicitudes, automatiza respuestas con Inteligencia Artificial
            y mejora tu soporte técnico fácilmente.
          </p>

          <div className="hero-buttons">

            <Link to="/register" className="start">
              Comenzar gratis
            </Link>

            {canInstall && (
              <button className="install-button" onClick={install}>
                Instalar aplicación
              </button>
            )}

          </div>

        </div>

        <div className="hero-right">
          <img src={panalIA} alt="Panal preview" />
        </div>

      </div>


      {/* MULTIPLATAFORMA */}

      <div className="platform-section">

        <div className="platform-container">

          <h2 className="platform-heading">
            Accede desde cualquier plataforma
          </h2>

          <p className="platform-title">
            Panal está diseñado como una solución multiplataforma que permite gestionar
            solicitudes de soporte desde diferentes dispositivos.
          </p>

          <div className="platform-cards">

            <div className="platform-card">

              <div className="platform-icon">
                <FaMobileAlt />
              </div>

              <h3>Acceso web y móvil</h3>

              <ul>
                <li>Accede desde cualquier navegador</li>
                <li>Interfaz optimizada para dispositivos móviles</li>
                <li>Gestiona solicitudes desde cualquier lugar</li>
                <li>Actualizaciones en tiempo real</li>
              </ul>

            </div>


            <div className="platform-card">

              <div className="platform-icon">
                <FaDesktop />
              </div>

              <h3>Aplicación Instalable</h3>

              <ul>
                <li>Instala Panal desde el navegador</li>
                <li>Experiencia similar a una app nativa</li>
                <li>Mayor rapidez de acceso</li>
                <li>Funciona en computadoras y laptops</li>
              </ul>

            </div>


            <div className="platform-card">

              <div className="platform-icon">
                <HiOutlineLightningBolt />
              </div>

              <h3>Modo Offline (PWA)</h3>

              <ul>
                <li>Funciona sin conexión a internet</li>
                <li>Guarda cambios localmente</li>
                <li>Sincroniza datos al reconectarse</li>
                <li>Ideal para conexiones inestables</li>
              </ul>

            </div>

          </div>

        </div>

      </div>


      {/* ESTADISTICAS */}

      <div className="stats-section" ref={statsRef}>

        <h2 className="stats-heading">
          Mejora el rendimiento de tu soporte técnico
        </h2>

        <p className="stats-subtitle">
          Con Panal puedes optimizar la gestión de solicitudes,
          reducir tiempos de respuesta y mejorar la eficiencia.
        </p>

        <div className="stats-container">

          <div className="stat-card">

            <div className="stat-gauge">

              <svg viewBox="0 0 120 120">
                <circle className="gauge-bg" cx="60" cy="60" r="50" />
                <circle className="gauge-fill gauge-85" cx="60" cy="60" r="50" />
              </svg>

              <span className="gauge-text">85%</span>

            </div>

            <div className="stat-icon">
              <FaUserClock />
            </div>

            <p>Reducción en el tiempo de respuesta a tickets</p>

          </div>


          <div className="stat-card">

            <div className="stat-gauge">

              <svg viewBox="0 0 120 120">
                <circle className="gauge-bg" cx="60" cy="60" r="50" />
                <circle className="gauge-fill gauge-92" cx="60" cy="60" r="50" />
              </svg>

              <span className="gauge-text">92.5%</span>

            </div>

            <div className="stat-icon">
              <FaBolt />
            </div>

            <p>Menos carga operativa para el equipo de soporte</p>

          </div>


          <div className="stat-card">

            <div className="stat-gauge">

              <svg viewBox="0 0 120 120">
                <circle className="gauge-bg" cx="60" cy="60" r="50" />
                <circle className="gauge-fill gauge-75" cx="60" cy="60" r="50" />
              </svg>

              <span className="gauge-text">3.5x</span>

            </div>

            <div className="stat-icon">
              <FaRocket />
            </div>

            <p>Resolución más rápida de incidencias</p>

          </div>


          <div className="stat-card">

            <div className="stat-gauge">

              <svg viewBox="0 0 120 120">
                <circle className="gauge-bg" cx="60" cy="60" r="50" />
                <circle className="gauge-fill gauge-100" cx="60" cy="60" r="50" />
              </svg>

              <span className="gauge-text">24/7</span>

            </div>

            <div className="stat-icon">
              <FaRobot />
            </div>

            <p>Automatización inteligente disponible 24/7</p>

          </div>

        </div>

      </div>


      {/* CTA */}

      <div className="cta-section">

        <div className="cta-container">

          <img src={squares} className="cta-bg" alt="" />
          <img src={squares} className="cta-bg-right" alt="" />

          <h2 className="cta-title">
            <span className="arrow-left">«</span>
            ¿Listo para optimizar tu soporte técnico?
            <span className="arrow-right">»</span>
          </h2>

          <p className="cta-text">
            Comienza a gestionar solicitudes y automatizar respuestas
            con inteligencia artificial.
          </p>

          <Link to="/register" className="cta-button">
            Crear cuenta gratis
          </Link>

        </div>

      </div>

      <FooterLanding />

    </div>
  )
}

export default LandingPage