import { useEffect, useState } from "react"
import { Page } from "../../templates"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

import { FiBox } from "react-icons/fi"
import { FaRocket } from "react-icons/fa"

import {
  FiArrowLeft,
  FiCreditCard,
  FiUser,
  FiMail,
  FiCalendar,
  FiUsers,
  FiCheck
} from "react-icons/fi"

import "./SubscriptionCheckoutPage.css"

const SubscriptionCheckoutPage: React.FC = () => {

  const navigate = useNavigate()
  const { user } = useAuth() as any

  const [plan, setPlan] = useState<any>(null)
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const isPremium = plan && plan.precio > 0

  const formatDate = (dateString: string) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  useEffect(() => {
    document.title = "Checkout"

    if (!user?._id) return

    const fetchData = async () => {
      try {
        const userRes = await fetch(`/api/usuarios/${user._id}`, {
          headers: { "ngrok-skip-browser-warning": "true" }
        })
        const userData = await userRes.json()
        setUserData(userData)

        if (!userData?.plan_id) return

        const plansRes = await fetch(`/api/plan`, {
          headers: { "ngrok-skip-browser-warning": "true" }
        })
        const plans = await plansRes.json()

        const planEncontrado = plans.find(
          (p: any) => String(p._id) === String(userData.plan_id)
        )

        setPlan(planEncontrado || null)

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  return (
    <Page>

      <div className="checkout-wrapper">

        {/* HEADER */}
        <div className="orders-header">
          <h2 className="orders-title">
            <FiCreditCard className="orders-title-icon"/>
            Checkout de suscripción
          </h2>

          <button 
            className="orders-create-btn"
            onClick={() => navigate("/subscription")}
          >
            <FiArrowLeft />
            Volver
          </button>
        </div>

        {/* PLAN ACTUAL */}
        <div className={`current-plan-card ${isPremium ? "plan-premium" : "plan-free"}`}>

          <span className="current-plan-label">PLAN ACTUAL</span>

          {loading ? (
            <p>Cargando...</p>
          ) : plan && (

            <div className="current-plan-content">

              {/* LEFT */}
              <div className="plan-left">

                <div className="plan-title-row">
                  <h3>{plan.nombre}</h3>
                  <span className="plan-badge">
                    {isPremium ? "PREMIUM" : "FREE"}
                  </span>
                </div>

                <p className="plan-description">{plan.descripcion}</p>

                <div className="plan-meta">
                  <div className="meta-item"><FiUser /> Usuario: {userData?.nombre}</div>
                  <div className="meta-item"><FiMail /> Correo: {userData?.correo}</div>
                  <div className="meta-item"><FiCalendar /> Activo desde {formatDate(userData?.createdAt)}</div>
                </div>

              </div>

              {/* RIGHT */}
              <div className="plan-right">

                <div className="plan-icon free-icon">
                  <FiBox />
                </div>

                <div className="price-block">
                  <span className="price">
                    {plan.precio === 0 ? "$0" : `$${plan.precio}`} 
                  </span>
                  <span className="period"> USD / {plan.tipoSuscripcion}</span>
                </div>

                <div className="plan-limit">
                  <FiUsers />
                  {plan.limiteUsuarios} usuarios
                </div>

              </div>

            </div>
          )}

        </div>

        {/* CONTENIDO */}
        <div className="checkout-container">

          {/* PREMIUM */}
          <div className="checkout-card premium-box">

            {/* ICONO + TITULO */}
            <div className="premium-header">
              
              <h3>Nuevo plan</h3><div className="plan-icon premium-icon">
                <FaRocket />
              </div>
            </div>

            <p className="change-text">
              Vas a cambiar a <strong>Premium</strong>
            </p>

            {/* PRECIO */}
            <div className="premium-price-block">
              <span className="premium-price">$29.99</span>
              <span className="premium-period">USD / mes</span>
            </div>

            <hr className="premium-divider"/>

            <p className="premium-subtitle">
              Para equipos y organizaciones
            </p>

            <div className="premium-features">
              <span><FiCheck className="check-icon"/> Espacios de trabajo ilimitados</span>
              <span><FiCheck className="check-icon"/> Gestión avanzada de tickets</span>
              <span><FiCheck className="check-icon"/> Inventario completo</span>
              <span><FiCheck className="check-icon"/> Órdenes de servicio avanzadas</span>
              <span><FiCheck className="check-icon"/> Acceso web, móvil y PWA</span>
              <span><FiCheck className="check-icon"/> Agente de IA integrado</span>
            </div>

          </div>

          {/* PAGO */}
          <div className="checkout-card">
            <h3>Pago</h3>
            <p>Aquí irá PayPal</p>
          </div>

        </div>

      </div>

    </Page>
  )
}

export default SubscriptionCheckoutPage