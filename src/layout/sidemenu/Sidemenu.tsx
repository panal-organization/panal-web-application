import { Box, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { NavLink } from "react-router-dom"

import {
  Home as HomeIcon,
  AccountBox as AccountIcon
} from "@mui/icons-material"

import logo from "../../assets/images/logo.png"
import { Overlay } from "../../components/shared"

import "./Sidemenu.css"

interface SidemenuProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Sidemenu: React.FC<SidemenuProps> = ({ open, setOpen }) => {

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("md"))

  const menu = [
    {
      id: 0,
      title: "Principal",
      menu: [
        { id: 1, title: "Inicio", path: "/home", icon: <HomeIcon /> },
        { id: 2, title: "Perfil", path: "/profile", icon: <AccountIcon /> }
      ]
    }
  ]

  return (
    <>

      {isSmall && open && (
        <Overlay onClick={() => setOpen(false)} />
      )}

      <Box
        className={`sidebar ${!open ? "sidebar-closed" : ""}`}
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

        {/* LOGO */}
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
        </div>

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
                    onClick={() => isSmall && setOpen(false)}
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