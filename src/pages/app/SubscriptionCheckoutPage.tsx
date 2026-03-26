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
  FiLock
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

  // 🔹 FETCH DATA
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

  // 🔥 PAYPAL
  useEffect(() => {

    if (loading || isPremium) return

    const addPaypalScript = () => {
      return new Promise<void>((resolve) => {
        if ((window as any).paypal) {
          resolve()
          return
        }

        const script = document.createElement("script")
        script.src = "https://www.paypal.com/sdk/js?client-id=AT003xCdTML8ADA1jDOEdXLxa3ldgCFkf_n3kL_GN7608wbgkxIluDzscc663sYp4KlKUxYJWylMk6Nj&currency=USD"
        script.onload = () => resolve()

        document.body.appendChild(script)
      })
    }

    addPaypalScript().then(() => {

      const paypal = (window as any).paypal
      if (!paypal) return

      paypal.Buttons({

        style: {
          color: "gold",
          shape: "pill",
          label: "pay"
        },

        createOrder: (_data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: { value: "29.99" }
            }]
          })
        },

        onApprove: (_data: any, actions: any) => {
          return actions.order.capture().then(async (details: any) => {

            alert("Pago completado por " + details.payer.name.given_name)

            const ahora = new Date()
            const vence = new Date()
            vence.setMonth(vence.getMonth() + 1)

            // 🔥 ACTUALIZA EN BACKEND
            await fetch(`/api/usuarios/${user._id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
              },
              body: JSON.stringify({
                nombre: userData.nombre,
                correo: userData.correo,
                status: true,
                plan_id: "69a3df3381a5be4cb1bd8bc3",
                plan_inicio: ahora,
                plan_vence: vence
              })
            })

            // 🔥 ACTUALIZA FRONTEND (CLAVE)
            localStorage.setItem("user", JSON.stringify({
              ...user,
              plan_id: "69a3df3381a5be4cb1bd8bc3"
            }))

            // 🔥 RECARGA PARA REFRESCAR UI
            window.location.reload()
          })
        }

      }).render("#paypal-button-container")

    })

  }, [loading, isPremium])

  return (
    <Page>

      <div className="checkout-wrapper">

        <div className="orders-header">
          <h2 className="orders-title">
            <FiCreditCard className="orders-title-icon"/>
            Mi suscripción
          </h2>

          <button 
            className="orders-create-btn"
            onClick={() => navigate("/dashboard")}
          >
            <FiArrowLeft />
            Volver
          </button>
        </div>

        <div className={`current-plan-card ${isPremium ? "plan-premium" : "plan-free"}`}>

          <span className="current-plan-label">PLAN ACTUAL</span>

          {loading ? (
            <p>Cargando información...</p>
          ) : plan && (

            <div className="current-plan-content">

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

                  {isPremium ? (
                    <>
                      <div className="meta-item">
                        <FiCalendar />
                        Inicio: {formatDate(userData?.plan_inicio)}
                      </div>

                      <div className="meta-item">
                        <FiCalendar />
                        Vence: {formatDate(userData?.plan_vence)}
                      </div>
                    </>
                  ) : (
                    <div className="meta-item">
                      <FiCalendar />
                      Activo desde {formatDate(userData?.createdAt)}
                    </div>
                  )}
                </div>

              </div>

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

                <div className={`plan-limit ${isPremium ? "limit-premium" : "limit-free"}`}>
                  <FiUsers className="limit-icon" />
                  {plan.limiteUsuarios} usuarios
                </div>

              </div>

            </div>
          )}

        </div>

        {!loading && !isPremium && (
          <div className="checkout-container">

            <div className="checkout-card premium-box">

              <div className="premium-header">
                <h3>Nuevo plan</h3>
                <div className="plan-icon premium-icon2">
                  <FaRocket />
                </div>
              </div>

              <p className="change-text">
                Vas a cambiar a <strong>Premium</strong>
              </p>

              <div className="premium-price-block">
                <span className="premium-price">$29.99</span>
                <span className="premium-period">USD / mes</span>
              </div>

              <p className="premium-note">
                Cancela en cualquier momento
              </p>

            </div>

            <div className="checkout-card payment-card">

              <div className="payment-header">
                <h3>Pago</h3>
                <div className="plan-icon payment-icon">
                  <FiCreditCard />
                </div>
              </div>

              <div className="payment-content">

                <div className="payment-branding">
                  <img src="/src/assets/images/paypal.png" alt="Panal" />
                  <p>"Tu sistema de soporte inteligente"</p>
                </div>

                <div id="paypal-button-container"></div>

                <span className="payment-secure">
                  <FiLock className="lock-icon" />
                  Pago seguro
                </span>

              </div>

            </div>

          </div>
        )}

      </div>

    </Page>
  )
}

export default SubscriptionCheckoutPage