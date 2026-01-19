import { Box, Typography } from "@mui/material"
import TitleStyle from "./TitleStyle"

interface TitleProps {
    title: string
}

export const TitleComponent: React.FC<TitleProps> = ({ title }) => {
    return (
        <Box sx={TitleStyle.main}>
            <Box sx={TitleStyle.line}></Box>
            <Typography sx={TitleStyle.title}>{title}</Typography>
        </Box>
    )
}