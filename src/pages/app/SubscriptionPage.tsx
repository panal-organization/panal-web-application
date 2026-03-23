import { Page } from "../../templates"
import { useEffect, useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

import { FiCheck, FiX } from "react-icons/fi"
import { FaCube, FaRocket } from "react-icons/fa"

import "./SubscriptionPage.css"

const SubscriptionPage: React.FC = () => {

  const navigate = useNavigate()
  const { user } = useAuth() as any

  const [loading, setLoading] = useState(true)

  // 🔥 IMPORTANTE: cambia esto por tu ID real de plan FREE
  const FREE_PLAN_ID = "69a3de4281a5be4cb1bd8bc0"

  useEffect(() => {
    document.title = "Suscripciones"

    if (!user?._id) return

    const checkUserPlan = async () => {
      try {

        const res = await fetch(`/api/usuarios/${user._id}`, {
          headers: { "ngrok-skip-browser-warning": "true" }
        })

        const data = await res.json()

        const isPremium = data.plan_id !== FREE_PLAN_ID

        // 🔥 REDIRECCIÓN
        if (isPremium) {
          navigate("/subscription/checkout")
        }

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    checkUserPlan()

  }, [user])

  // 🔥 evita que se vea la página antes de redirigir
  if (loading) return null

  return (

    <Page>

      <div className="pricing-section">

        <div className="pricing-container">

          <h1 className="pricing-title">
            Planes de suscripción
          </h1>

          <p className="pricing-description">
            Administra tu plan actual o mejora tu suscripción con más funcionalidades.
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

                <li><FiCheck className="check"/> Hasta 3 espacios de trabajo</li>
                <li><FiCheck className="check"/> Gestión de tickets</li>
                <li><FiCheck className="check"/> Órdenes de servicio</li>
                <li><FiCheck className="check"/> Inventario básico</li>
                <li><FiCheck className="check"/> Acceso web y PWA</li>

                <li className="disabled">
                  <FiX className="x"/> Agente de Inteligencia Artificial
                </li>

                <li className="disabled">
                  <FiX className="x"/> Automatización de procesos
                </li>

                <li className="disabled">
                  <FiX className="x"/> Métricas operativas
                </li>

              </ul>

              <a className="plan-button free">
                Plan actual
              </a>

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

                <li><FiCheck className="check"/> Espacios de trabajo ilimitados</li>
                <li><FiCheck className="check"/> Gestión avanzada de tickets</li>
                <li><FiCheck className="check"/> Inventario completo</li>
                <li><FiCheck className="check"/> Órdenes de servicio avanzadas</li>
                <li><FiCheck className="check"/> Acceso web, móvil y PWA</li>
                <li><FiCheck className="check"/> Agente de Inteligencia Artificial</li>
                <li><FiCheck className="check"/> Automatización de procesos</li>
                <li><FiCheck className="check"/> Métricas y monitoreo</li>

              </ul>

              <Link 
                to="/subscription/checkout"
                className="plan-button premium-btn"
              >
                Obtener plan
              </Link>

            </div>

          </div>

        </div>

      </div>

    </Page>

  )
}

export default SubscriptionPage