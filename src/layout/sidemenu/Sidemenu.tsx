import { Box, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import logoGold from "../../assets/images/2gold.png"
import logo from "../../assets/images/logo.png"


import {
  Home as DashboardIcon,
  Assignment as TicketsIcon,
  Construction as OrdersIcon,
  ListAlt   as OrdersIcon2,
  Groups  as WorkspacesIcon,
  CreditCard as SubscriptionIcon,
  ManageAccounts    as AccountIcon,
  GridView      as InventoryIcon,
  Build as MaintenanceIcon
} from "@mui/icons-material"

import { Overlay } from "../../components/shared"
import { useAuth } from "../../context/AuthContext"

import "./Sidemenu.css"

export const Sidemenu = () => {

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("md"))
  const location = useLocation()

  const navigate = useNavigate()
  const { user } = useAuth() as any

  const FREE_PLAN_ID = "69a3de4281a5be4cb1bd8bc0"
  const isPremium = user?.plan_id && user.plan_id !== FREE_PLAN_ID

  // 🔥 sidebar abierto/cerrado
  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar-open")
    return saved ? JSON.parse(saved) : true
  })

  useEffect(() => {
    localStorage.setItem("sidebar-open", JSON.stringify(open))
  }, [open])

  // 🔥 dropdown servicios
  const [openServices, setOpenServices] = useState(
    location.pathname.includes("orders") ||
    location.pathname.includes("tickets")
  )

  // 🔥 panel control
  const [controlOpen, setControlOpen] = useState(false)

  useEffect(() => {
    const handleClick = () => setControlOpen(false)
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])

  const handleSubscriptionClick = async (e: any) => {
    e.preventDefault()

    if (!user?._id) return

    try {
      const res = await fetch(`/api/usuarios/${user._id}`, {
     headers: {
  "Content-Type": "application/json"
}
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

  return (
    <>
      {isSmall && open && <Overlay onClick={() => setOpen(false)} />}

      <Box className={`sidebar ${!open ? "sidebar-closed" : ""} ${isPremium ? "sidebar-premium" : ""}`}>

        {/* HEADER */}
        <NavLink to="/dashboard" className="sidebar-header">
          <img src={isPremium ? logoGold : logo} className="sidebar-logo" />
          {open && <div className="sidebar-brand">Panal<span className="tm">™</span></div>}
        </NavLink>

        {/* MENU */}
        <div className="sidebar-body">

          {/* Inicio */}
          <NavLink to="/dashboard" className="sidebar-link">
            <div className="sidebar-icon"><DashboardIcon /></div>
            {open && <div className="sidebar-text">Inicio</div>}
          </NavLink>

          {/* 🔥 SERVICIOS */}
          <div className="sidebar-item-wrapper">

            <div
              className={`sidebar-link ${location.pathname.includes("orders") || location.pathname.includes("tickets") ? "active" : ""}`}
            onClick={(e) => {
  e.stopPropagation()

  if (!open) {
    setOpen(true) // 👈 abre sidebar
    return
  }

  setOpenServices(!openServices)
}}
            >
              <div className="sidebar-icon"><OrdersIcon /></div>
              {open && <div className="sidebar-text">Servicios</div>}
            </div>

            {openServices && open && (
              <div className="sidebar-submenu">

                <NavLink to="/orders" className="sidebar-subitem">
  <span className="sidebar-subicon">
    <OrdersIcon2 fontSize="small" />
  </span>
  Órdenes
</NavLink>

                <NavLink to="/tickets" className="sidebar-subitem">
  <span className="sidebar-subicon">
    <TicketsIcon fontSize="small" />
  </span>
  Tickets
</NavLink>

              </div>
            )}

          </div>

          {/* Almacén */}
          <NavLink to="/inventory" className="sidebar-link">
            <div className="sidebar-icon"><InventoryIcon /></div>
            {open && <div className="sidebar-text">Almacén</div>}
          </NavLink>

          {/* Mantenimiento */}
          <NavLink to="/maintenance" className="sidebar-link">
            <div className="sidebar-icon"><MaintenanceIcon /></div>
            {open && <div className="sidebar-text">Mantenimiento</div>}
          </NavLink>

          {/* Workspaces */}
          <NavLink to="/workspaces" className="sidebar-link">
            <div className="sidebar-icon"><WorkspacesIcon /></div>
            {open && <div className="sidebar-text">Espacios de trabajo</div>}
          </NavLink>

          {/* Suscripción */}
          <NavLink
            to="/subscription"
            className="sidebar-link"
            onClick={(e) => handleSubscriptionClick(e)}
          >
            <div className="sidebar-icon"><SubscriptionIcon /></div>
            {open && <div className="sidebar-text">Suscripción</div>}
          </NavLink>

          {/* Configuración */}
          <NavLink to="/account" className="sidebar-link">
            <div className="sidebar-icon"><AccountIcon /></div>
            {open && <div className="sidebar-text">Configuración</div>}
          </NavLink>

        </div>

        {/* BOTÓN CONTROL */}
        <div
          className="sidebar-control-button"
          onClick={(e) => {
            e.stopPropagation()
            setControlOpen(!controlOpen)
          }}
        >
          ☰
        </div>

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
              ● Expandir
            </div>

            <div
              className={`sidebar-control-option ${!open ? "active" : ""}`}
              onClick={() => {
                setOpen(false)
                setControlOpen(false)
              }}
            >
              ● Contraer
            </div>

          </div>
        )}

      </Box>
    </>
  )
}