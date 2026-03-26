import { Box, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { NavLink } from "react-router-dom"

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

interface SidemenuProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Sidemenu: React.FC<SidemenuProps> = ({ open, setOpen }) => {

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("md"))

  const { user } = useAuth() as any

  // 🔥 CLAVE: sin fetch, directo del AuthContext
  const FREE_PLAN_ID = "69a3de4281a5be4cb1bd8bc0"

 const isPremium = user?.plan_id && user.plan_id !== FREE_PLAN_ID

  // 🔥 CLICK INTELIGENTE (esto lo dejamos igual)
  const handleSubscriptionClick = async (e: any) => {

    e.preventDefault()

    if (!user?._id) return

    try {
      const res = await fetch(`/api/usuarios/${user._id}`, {
        headers: { "ngrok-skip-browser-warning": "true" }
      })

      const data = await res.json()

      const isPremiumNow = data.plan_id !== FREE_PLAN_ID

      if (isPremiumNow) {
        window.location.href = "/subscription/checkout"
      } else {
        window.location.href = "/subscription"
      }

    } catch (err) {
      console.error(err)
    }
  }

  const menu = [
    {
      id: 0,
      title: "",
      menu: [
        {
          id: 1,
          title: "Dashboard",
          path: "/dashboard",
          icon: <DashboardIcon />
        },
        {
          id: 2,
          title: "Tickets",
          path: "/tickets",
          icon: <TicketsIcon />
        },
        {
          id: 3,
          title: "Órdenes de servicio",
          path: "/orders",
          icon: <OrdersIcon />
        },
        {
          id: 4,
          title: "Inventario",
          path: "/inventory",
          icon: <InventoryIcon />
        },
        {
          id: 5,
          title: "Espacios de trabajo",
          path: "/workspaces",
          icon: <WorkspacesIcon />
        },
        {
          id: 6,
          title: "Suscripción",
          path: "/subscription",
          icon: <SubscriptionIcon />
        },
        {
          id: 7,
          title: "Mi cuenta",
          path: "/account",
          icon: <AccountIcon />
        }
      ]
    }
  ]

  return (
    <>

      {isSmall && open && (
        <Overlay onClick={() => setOpen(false)} />
      )}

      <Box
        className={`sidebar ${!open ? "sidebar-closed" : ""} ${isPremium ? "sidebar-premium" : ""}`}
        sx={
          isSmall
            ? {
                position: "fixed",
                zIndex: 1300,
                height: "100vh",
                overflowY: "auto"
              }
            : {}
        }
      >

        {/* BOTÓN */}
        <button
          className={`sidebar-toggle ${open ? "open" : "closed"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? "‹" : "›"}
        </button>

        {/* HEADER */}
        <NavLink to="/dashboard" className="sidebar-header">
          <img
            src={isPremium ? logoGold : logo}
            alt="Panal"
            className="sidebar-logo"
          />

          {open && (
            <div className="sidebar-brand">
              Panal<span className="tm">™</span>
            </div>
          )}
        </NavLink>

        {/* BODY */}
        <div className="sidebar-body">

          {menu.map((section) => (
            <div key={section.id} className="sidebar-section">

              <div className="sidebar-section-title">
                {section.title}
              </div>

              <div className="sidebar-menu">

                {section.menu.map((item) => (

                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={(e) => {

                      if (item.path === "/subscription") {
                        handleSubscriptionClick(e)
                      } else {
                        isSmall && setOpen(false)
                      }

                    }}
                    className="sidebar-link"
                  >

                    <div className="sidebar-icon">
                      {item.icon}
                    </div>

                    <div className="sidebar-text">
                      {item.title}
                    </div>

                  </NavLink>

                ))}

              </div>

            </div>
          ))}

        </div>

      </Box>

    </>
  )
}