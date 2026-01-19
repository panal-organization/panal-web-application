import { Box } from "@mui/material"
import { Page } from "../../templates"
import { TitleComponent } from "../../components/shared"

const HomePage: React.FC = () => {
    return (
        <Page children={
            <Box>
                <TitleComponent title="Inicio" />
            </Box>
        } />
    )
}



export default HomePage
