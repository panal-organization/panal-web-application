import { IconButton } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import { FiSettings, FiLogOut, FiBell } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import "./Header.css"
import { useState, useEffect } from "react"

import { useAuth } from "../../context/AuthContext"

interface HeaderProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const Header: React.FC<HeaderProps> = ({ open, setOpen }) => {

    const [notifications, setNotifications] = useState(0)
    const { user, logout: authLogout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {

        const fetchNotifications = async () => {

            try {

                // aquí irá tu endpoint después
                // const res = await fetch("/api/notifications")
                // const data = await res.json()
                // setNotifications(data.count)

                setNotifications(0) // temporal

            } catch (error) {
                console.error(error)
            }

        }

        fetchNotifications()

    }, [])

    const logout = () => {
        authLogout()
        navigate("/login")
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
                    <strong className="header-name">{user?.nombre}</strong>
                </span>

                {/* NOTIFICATIONS */}
                <button
                    className="header-icon notification-button"
                    onClick={() => navigate("/notifications")}
                >
                    <FiBell />

                    <span
                        className={`notification-badge ${notifications === 0 ? "notification-empty" : "notification-active"
                            }`}
                    >
                        {notifications}
                    </span>

                </button>

                {/* SETTINGS */}
                <button
                    className="header-icon"
                    onClick={() => navigate("/account")}
                >
                    <FiSettings />
                </button>

                {/* LOGOUT */}
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