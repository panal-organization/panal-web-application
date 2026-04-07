import { Box } from "@mui/material"
import ContentStyle from "./ContentStyle"
import ChatWidget from "../../components/ai/ChatWidget";
interface ContentProps {
    children: React.ReactNode
}

export const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <Box sx={ContentStyle.content}>
            {children}
              <ChatWidget />
        </Box>
    )
}