import { Box } from "@mui/material"
import { useEffect } from "react"
import { Page } from "../../templates"
import { useWorkspace } from "../../context/WorkspaceContext"

const HomePage: React.FC = () => {

  const { workspace } = useWorkspace() // 🔥 AQUÍ

  useEffect(() => {
    document.title = "Dashboard"
  }, [])

  useEffect(() => {
    console.log("🌍 Workspace global:", workspace)
  }, [workspace])

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