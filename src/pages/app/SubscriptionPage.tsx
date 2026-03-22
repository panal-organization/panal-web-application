import { Box, Typography } from "@mui/material"
import { Page } from "../../templates"
import { useEffect } from "react"

const SubscriptionPage: React.FC = () => {
    useEffect(() => {
    document.title = "Suscripciones"
  }, [])


  return (

    <Page
      children={
        <Box>

          <Typography variant="h4" fontWeight="bold" mb={2}>
            Suscripción
          </Typography>

          <Typography>
            Administra tu plan y suscripción del sistema.
          </Typography>

        </Box>
      }
    />

  )
}

export default SubscriptionPage