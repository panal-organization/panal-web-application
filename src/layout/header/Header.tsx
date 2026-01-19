import { Box, IconButton } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import HeaderStyle from './HeaderStyle'

interface HeaderProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const Header: React.FC<HeaderProps> = ({ open, setOpen }) => {
    return (
        <Box sx={HeaderStyle.header}>
            <IconButton onClick={() => setOpen(!open)}>
                <MenuIcon />
            </IconButton>
        </Box>
    )
}