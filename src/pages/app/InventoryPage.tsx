import { Box, Typography } from "@mui/material"
import { Page } from "../../templates"

const InventoryPage: React.FC = () => {

  return (

    <Page
      children={
        <Box>

          <Typography variant="h4" fontWeight="bold" mb={2}>
            Inventario
          </Typography>

          <Typography>
            Aquí podrás gestionar los artículos del inventario.
          </Typography>

        </Box>
      }
    />

  )
}

export default InventoryPage