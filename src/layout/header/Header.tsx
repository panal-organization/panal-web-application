import { IconButton } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
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

            <IconButton onClick={() => setOpen(!open)}>
                <MenuIcon />
            </IconButton>

            <div className="header-user">

                <img
                    src={user.foto}
                    className="header-avatar"
                />

                <span>{user.nombre}</span>

                <button
                    className="header-logout"
                    onClick={logout}
                >
                    Cerrar sesión
                </button>

            </div>

        </div>
    )
}