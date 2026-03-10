import { IconButton } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import { FiSettings, FiLogOut } from "react-icons/fi"
import "./Header.css"

interface HeaderProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const Header: React.FC<HeaderProps> = ({ open, setOpen }) => {

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/login"
  }

  return (

    <div className="header">

      {/* botón abrir sidebar */}
      <IconButton onClick={() => setOpen(!open)} className="menu-button">
        <MenuIcon />
      </IconButton>

      {/* área usuario */}
      <div className="header-user">

        <span className="header-username">
  Bienvenid@ de vuelta: 
  <strong className="header-name">{user.nombre}</strong>
</span>
        <button className="header-icon">
          <FiSettings />
        </button>

        <button
          className="header-icon"
          onClick={logout}
        >
          <FiLogOut />
        </button>

      </div>

    </div>

  )
}