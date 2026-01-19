import { Box } from "@mui/material"
import OverlayStyle from "./OverlayStyle"

interface OverlayProps {
    onClick?: () => void
}

export const Overlay: React.FC<OverlayProps> = ({ onClick }) => {
    return (
        <Box sx={OverlayStyle.main} onClick={onClick}></Box>
    )
}
