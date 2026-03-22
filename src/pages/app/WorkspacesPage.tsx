import { Box, Typography } from "@mui/material"
import { Page } from "../../templates"
import { useEffect } from "react"

const WorkspacesPage: React.FC = () => {
  useEffect(() => {
    document.title = "Workspaces"
  }, [])

  return (

    <Page
      children={
        <Box>

          <Typography variant="h4" fontWeight="bold" mb={2}>
            Espacios de trabajo
          </Typography>

          <Typography>
            Aquí podrás ver y cambiar entre tus espacios de trabajo.
          </Typography>

        </Box>
      }
    />

  )
}

export default WorkspacesPage