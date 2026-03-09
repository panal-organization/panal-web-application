import HeaderLanding from "../../../components/landing/HeaderLanding"
import FooterLanding from "../../../components/landing/FooterLanding"
import { NavLink } from "react-router-dom"
import squares from "../../../assets/images/squares.png"

import { FaCloud, FaLayerGroup, FaMobileAlt, FaShieldAlt } from "react-icons/fa"
import { FiCpu } from "react-icons/fi"

import "./FeaturesPage.css"
import { useEffect } from "react"

const FeaturesPage = () => {

  
     useEffect(() => {
        document.title = "Características"
      }, [])
  
  return (
    <div>

      <HeaderLanding />

      <section className="features-section">

        <div className="features-container">

          <h1 className="features-title">
            Características de Panal
          </h1>

          <p className="features-intro">
            Panal es una plataforma SaaS diseñada para centralizar la
            gestión de soporte técnico mediante una arquitectura escalable,
            segura y orientada a la automatización de procesos.
          </p>

          <div className="features-grid">

            {/* SAAS */}

            <div className="feature-card">

              <div className="feature-icon">
                <FaCloud />
              </div>

              <h3>Arquitectura SaaS</h3>

              <p>
                Plataforma desplegada como Software as a Service que
                elimina la necesidad de infraestructura local. Las
                organizaciones acceden mediante navegador o aplicación
                móvil sin instalación ni mantenimiento de servidores.
              </p>

            </div>


            {/* MULTI TENANT */}

            <div className="feature-card">

              <div className="feature-icon">
                <FaLayerGroup />
              </div>

              <h3>Modelo Multi-Tenant</h3>

              <p>
                Permite que múltiples organizaciones operen en la misma
                plataforma manteniendo aislamiento lógico de datos,
                control de roles y gestión independiente por cliente.
              </p>

            </div>


            {/* MULTIPLATAFORMA */}

            <div className="feature-card">

              <div className="feature-icon">
                <FaMobileAlt />
              </div>

              <h3>Acceso Multiplataforma</h3>

              <p>
                Acceso desde aplicación web, dispositivos móviles y
                aplicación progresiva (PWA), permitiendo gestionar
                tickets y operaciones desde cualquier dispositivo.
              </p>

            </div>


            {/* SEGURIDAD */}

            <div className="feature-card">

              <div className="feature-icon">
                <FaShieldAlt />
              </div>

              <h3>Seguridad y Arquitectura Modular</h3>

              <p>
                Arquitectura basada en servicios backend desacoplados
                mediante API REST, facilitando escalabilidad,
                mantenimiento independiente y control seguro de acceso.
              </p>

            </div>


            {/* IA */}

            <div className="feature-card">

              <div className="feature-icon">
                <FiCpu />
              </div>

              <h3>Automatización con IA</h3>

              <p>
                Integración de inteligencia artificial para clasificar
                tickets, generar resúmenes operativos y asistir en la
                gestión automatizada de incidencias.
              </p>

            </div>

          </div>

        </div>

        

      </section>

{/* CTA FINAL */}
<section className="features-cta">

  <div className="features-cta-container">

    <img
      src={squares}
      alt=""
      className="cta-bg"
    />

    <img
      src={squares}
      alt=""
      className="cta-bg-right"
    />

    <h2 className="features-cta-title">
      <span className="arrow-left">«</span>
      Lleva la gestión de soporte técnico al siguiente nivel
      <span className="arrow-right">»</span>
    </h2>

    <p className="features-cta-text">
      Centraliza tickets, automatiza procesos con inteligencia artificial
      y mejora la eficiencia de tu equipo desde una sola plataforma.
    </p>

    <NavLink to="/register" className="features-cta-button">
      Crear cuenta gratuita
    </NavLink>

  </div>

</section>      <FooterLanding />

    </div>
  )
}

export default FeaturesPage