import { Box, IconButton } from '@mui/material'
import AppStyles from './AppStyles'
import { Menu as MenuIcon } from '@mui/icons-material'
import { useState } from 'react'

interface AppLayoutProps {
    children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const [open, setOpen] = useState(false)
    return (
        <Box sx={AppStyles.container}>
            <Box sx={[
                AppStyles.sidebar,
                !open && AppStyles.sidebarClosed
            ]}>
                Sidebar
            </Box>
            <Box sx={AppStyles.body}>
                <Box sx={AppStyles.header}>
                    <IconButton onClick={() => setOpen(!open)}>
                        <MenuIcon />
                    </IconButton>
                </Box>
                <Box sx={AppStyles.content}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

export default AppLayout
