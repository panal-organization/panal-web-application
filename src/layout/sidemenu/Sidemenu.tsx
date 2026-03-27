import { Box, useMediaQuery, Tooltip } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import logoGold from "../../assets/images/2gold.png"
import logo from "../../assets/images/logo.png"

import {
  SpaceDashboard as DashboardIcon,
  Assignment as TicketsIcon,
  Construction as OrdersIcon,
  Workspaces as WorkspacesIcon,
  CreditCard as SubscriptionIcon,
  AccountBox as AccountIcon,
  Archive as InventoryIcon
} from "@mui/icons-material"

import { Overlay } from "../../components/shared"
import { useAuth } from "../../context/AuthContext"

import "./Sidemenu.css"

export const Sidemenu = () => {

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("md"))

  const navigate = useNavigate()
  const { user } = useAuth() as any

  const FREE_PLAN_ID = "69a3de4281a5be4cb1bd8bc0"
  const isPremium = user?.plan_id && user.plan_id !== FREE_PLAN_ID

  // 🔥 estado sidebar (persistente)
  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar-open")
    return saved ? JSON.parse(saved) : true
  })

  useEffect(() => {
    localStorage.setItem("sidebar-open", JSON.stringify(open))
  }, [open])

  // 🔥 estado panel control
  const [controlOpen, setControlOpen] = useState(false)

  // 🔥 cerrar panel al hacer click fuera
  useEffect(() => {
    const handleClick = () => setControlOpen(false)
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])

  // 🔥 lógica subscription
  const handleSubscriptionClick = async (e: any) => {
    e.preventDefault()

    if (!user?._id) return

    try {
      const res = await fetch(`/api/usuarios/${user._id}`, {
        headers: { "ngrok-skip-browser-warning": "true" }
      })

      const data = await res.json()

      const isPremiumUser = data.plan_id !== FREE_PLAN_ID

      if (isPremiumUser) {
        navigate("/subscription/checkout")
      } else {
        navigate("/subscription")
      }

    } catch (err) {
      console.error(err)
    }
  }

  const menu = [
    { id: 1, title: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { id: 2, title: "Tickets", path: "/tickets", icon: <TicketsIcon /> },
    { id: 3, title: "Órdenes", path: "/orders", icon: <OrdersIcon /> },
    { id: 4, title: "Inventario", path: "/inventory", icon: <InventoryIcon /> },
    { id: 5, title: "Workspaces", path: "/workspaces", icon: <WorkspacesIcon /> },
    { id: 6, title: "Suscripción", path: "/subscription", icon: <SubscriptionIcon /> },
    { id: 7, title: "Cuenta", path: "/account", icon: <AccountIcon /> }
  ]

  return (
    <>
      {/* overlay mobile */}
      {isSmall && open && <Overlay onClick={() => setOpen(false)} />}

      <Box
        className={`sidebar ${!open ? "sidebar-closed" : ""} ${isPremium ? "sidebar-premium" : ""}`}
      >

        {/* HEADER */}
        <NavLink to="/dashboard" className="sidebar-header">
          <img
            src={isPremium ? logoGold : logo}
            className="sidebar-logo"
          />
          {open && (
            <div className="sidebar-brand">
              Panal<span className="tm">™</span>
            </div>
          )}
        </NavLink>

        {/* MENU */}
        <div className="sidebar-body">

          {menu.map((item) => (

            <Tooltip
              key={item.id}
              title={!open ? item.title : ""}
              placement="right"
              arrow
            >
              <NavLink
                to={item.path}
                className="sidebar-link"
                onClick={(e) => {

                  e.stopPropagation()

                  if (item.path === "/subscription") {
                    handleSubscriptionClick(e)
                  }

                }}
              >
                <div className="sidebar-icon">{item.icon}</div>

                {open && (
                  <div className="sidebar-text">
                    {item.title}
                  </div>
                )}
              </NavLink>
            </Tooltip>

          ))}

        </div>

        {/* 🔥 BOTÓN SUPABASE */}
        <div
          className="sidebar-control-button"
          onClick={(e) => {
            e.stopPropagation()
            setControlOpen(!controlOpen)
          }}
        >
          ☰
        </div>

        {/* 🔥 PANEL FLOTANTE */}
        {controlOpen && (
          <div className="sidebar-control-panel">

            <div className="sidebar-control-title">
             Control del menú
            </div>

            <div
              className={`sidebar-control-option ${open ? "active" : ""}`}
              onClick={() => {
                setOpen(true)
                setControlOpen(false)
              }}
            >
              ● Expandido
            </div>

            <div
              className={`sidebar-control-option ${!open ? "active" : ""}`}
              onClick={() => {
                setOpen(false)
                setControlOpen(false)
              }}
            >
              ● Contraido
            </div>

          

          </div>
        )}

      </Box>
    </>
  )
}