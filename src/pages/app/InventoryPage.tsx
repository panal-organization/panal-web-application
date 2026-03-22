import { Box, Typography } from "@mui/material"
import { Page } from "../../templates"
import { useEffect } from "react"

const InventoryPage: React.FC = () => {



  useEffect(() => {
    document.title = "Inventario"
  }, [])



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