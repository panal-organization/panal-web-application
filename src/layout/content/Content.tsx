import { Box } from "@mui/material"
import ContentStyle from "./ContentStyle"

interface ContentProps {
    children: React.ReactNode
}

export const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <Box sx={ContentStyle.content}>
            {children}
        </Box>
    )
}
