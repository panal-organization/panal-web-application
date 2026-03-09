import HeaderLanding from "../../components/landing/HeaderLanding"
import FooterLanding from "../../components/landing/FooterLanding"

import { FaMobileAlt, FaDesktop } from "react-icons/fa"
import { HiOutlineLightningBolt } from "react-icons/hi"

import panalIA from "../../assets/images/IA.png"

import "./LandingPage.css"

const LandingPage = () => {

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

          <button className="start">
            Comenzar gratis
          </button>
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
            solicitudes de soporte desde diferentes dispositivos. Puede utilizarse
            directamente desde el navegador web, desde dispositivos móviles o instalarse
            como aplicación PWA para trabajar de forma más rápida y continuar operando
            incluso sin conexión a internet.
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
                <li>Instala Panal directamente desde el navegador</li>
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
                <li>Funciona incluso sin conexión a internet</li>
                <li>Guarda cambios localmente</li>
                <li>Sincroniza datos al reconectarse</li>
                <li>Ideal para entornos con conexión inestable</li>
              </ul>
            </div>

          </div>

        </div>

      </div>


      <FooterLanding />

    </div>
  )
}

export default LandingPage