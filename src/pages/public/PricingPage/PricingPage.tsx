import HeaderLanding from "../../../components/landing/HeaderLanding"
import FooterLanding from "../../../components/landing/FooterLanding"

import { FiCheck, FiX } from "react-icons/fi"
import { FaCube, FaRocket } from "react-icons/fa"

import { NavLink } from "react-router-dom"

import { useEffect } from "react"

import "./PricingPage.css"

const PricingPage = () => {



  
     useEffect(() => {
        document.title = "Suscripciones"
      }, [])
  


  return (
    <div>

      <HeaderLanding />

      <section className="pricing-section">

        <div className="pricing-container">

          <h1 className="pricing-title">
             Planes de suscripción
             </h1>

          <p className="pricing-description">
            Elige el plan ideal para tu organización y mejora la gestión
            del soporte técnico con herramientas modernas, automatización
            e inteligencia artificial.
          </p>

          <div className="pricing-grid">


            {/* PLAN GRATIS */}

            <div className="pricing-card">

              <div className="pricing-icon free-icon">
                <FaCube />
              </div>

              <h3>Plan Básico</h3>

<div className="plan-price">
  $0
  <span>/mes</span>
</div>

<p className="plan-subtitle">
  Perfecto para comenzar
</p>

              <ul className="plan-features">

                <li>
                  <FiCheck className="check"/>
                  Hasta 3 espacios de trabajo
                </li>

                <li>
                  <FiCheck className="check"/>
                  Gestión de tickets
                </li>

                <li>
                  <FiCheck className="check"/>
                  Órdenes de servicio
                </li>

                <li>
                  <FiCheck className="check"/>
                  Inventario básico
                </li>

                <li>
                  <FiCheck className="check"/>
                  Acceso web y PWA
                </li>

                <li className="disabled">
                  <FiX className="x"/>
                  Agente de Inteligencia Artificial
                </li>

                <li className="disabled">
                  <FiX className="x"/>
                  Automatización de procesos
                </li>

                <li className="disabled">
                  <FiX className="x"/>
                  Métricas operativas
                </li>

              </ul>

              <NavLink to="/register" className="plan-button free">
                Comenzar gratis
              </NavLink>

            </div>



            {/* PLAN PREMIUM */}

            <div className="pricing-card premium">

              <div className="popular-tag">
                Más popular
              </div>

              <div className="pricing-icon premium-icon">
                <FaRocket />
              </div>

             <h3>Plan Profesional</h3>

<div className="plan-price pro-price">
  $299
  <span>MXN / mes</span>
</div>

              <p className="plan-subtitle">
                Para equipos y organizaciones
              </p>

              <ul className="plan-features">

                <li>
                  <FiCheck className="check"/>
                  Espacios de trabajo ilimitados
                </li>

                <li>
                  <FiCheck className="check"/>
                  Gestión avanzada de tickets
                </li>

                <li>
                  <FiCheck className="check"/>
                  Inventario completo
                </li>

                <li>
                  <FiCheck className="check"/>
                  Órdenes de servicio avanzadas
                </li>

                <li>
                  <FiCheck className="check"/>
                  Acceso web, móvil y PWA
                </li>

                <li>
                  <FiCheck className="check"/>
                  Agente de Inteligencia Artificial
                </li>

                <li>
                  <FiCheck className="check"/>
                  Automatización de procesos
                </li>

                <li>
                  <FiCheck className="check"/>
                  Métricas y monitoreo
                </li>

              </ul>

              <NavLink to="/register" className="plan-button premium-btn">
                Obtener plan
              </NavLink>

            </div>


          </div>

        </div>

      </section>

      <FooterLanding />

    </div>
  )
}

export default PricingPage