import { Box, useMediaQuery } from '@mui/material'
import SidemenuStyle from './SidemenuStyle'
import logo from '../../assets/images/logo.png'
import {
    Home as HomeIcon,
    AccountBox as AccountIcon
} from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { Overlay } from '../../components/shared'

interface SidemenuProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Sidemenu: React.FC<SidemenuProps> = ({ open, setOpen }) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))

    // Combinar estilos sidebar con responsivo y abierto/cerrado
    const sidebarStyles = {
        ...SidemenuStyle.sidebar,
        ...(isSmall ? {
            position: 'fixed',
            zIndex: 1300,
            height: '100vh',
            overflowY: 'auto'
        } : {}),
        ...(!open ? SidemenuStyle.sidebarClosed : {}),
    };

    const menu = [
        {
            id: 0,
            title: 'Principal',
            menu: [
                { id: 0, title: 'Inicio', path: '/home', icon: <HomeIcon /> },
                { id: 0, title: 'Perfil', path: '/profile', icon: <AccountIcon /> },
            ],
            submenu: [
                {
                    id: 0, title: 'Usuarios',
                    menu: [
                        { id: 0, title: 'Usuarios', path: '/usuarios' },
                    ]
                }
            ]
        }
    ]

    return (
        <>
            {isSmall && open && (
                <Overlay onClick={() => setOpen(false)} />
            )}
            <Box sx={sidebarStyles}>
                <Box sx={SidemenuStyle.header}>
                    <Box component="img" src={logo} alt="Logo" sx={SidemenuStyle.logo} />
                </Box>
                <Box sx={SidemenuStyle.body}>
                    {/* Sección */}
                    {menu.map((section) => (
                        <Box key={section.id} sx={SidemenuStyle.section}>
                            {/** Titulo de la sección */}
                            <Box sx={SidemenuStyle.sectionTitle}>{section.title}</Box>
                            {/** Menu de la sección */}
                            <Box sx={SidemenuStyle.sectionMenu}>
                                {section.menu.map((item) => (
                                    <Box key={item.id} sx={SidemenuStyle.sectionMenuItem}>
                                        <Box
                                            component={NavLink}
                                            to={item.path}
                                            onClick={() => isSmall && setOpen(false)}
                                            sx={{
                                                ...SidemenuStyle.sectionMenuItemLink,
                                                '&.active': SidemenuStyle.sectionMenuItemLinkActive,
                                            }}
                                        >
                                            <Box sx={SidemenuStyle.sectionMenuItemLinkIcon}>{item.icon}</Box>
                                            <Box sx={SidemenuStyle.sectionMenuItemLinkText}>{item.title}</Box>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    )
}
