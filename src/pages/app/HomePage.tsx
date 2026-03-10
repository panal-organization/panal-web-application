import { Box } from "@mui/material"
import { useEffect } from "react"
import { Page } from "../../templates"

const HomePage: React.FC = () => {

  useEffect(() => {
    document.title = "Dashboard"
  }, [])

  return (
    <Page
      children={
        <Box>
          Main
        </Box>
      }
    />
  )
}

export default HomePage