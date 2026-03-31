import { Box, Typography } from "@mui/material"
import { Page } from "../../templates"
import { useEffect, useState } from "react"
import { useWorkspace } from "../../context/WorkspaceContext"
import { useAuth } from "../../context/AuthContext"

const WorkspacesPage: React.FC = () => {

  const { user } = useAuth()
  const { workspace, setWorkspace } = useWorkspace()

  const [workspaces, setWorkspaces] = useState<any[]>([])

  useEffect(() => {

    if (!user?._id) return

    const fetchWorkspaces = async () => {

      try {
        const relRes = await fetch(`/api/workspaces-usuarios`, {
          headers: { "ngrok-skip-browser-warning": "true" }
        })

        const relaciones = await relRes.json()

        const misRelaciones = relaciones.filter(
          (r: any) => r.usuario_id === user._id
        )

        const workspaceIds = misRelaciones.map(
          (r: any) => r.workspace_id
        )

        const wsRes = await fetch(`/api/workspaces`, {
          headers: { "ngrok-skip-browser-warning": "true" }
        })

        const allWorkspaces = await wsRes.json()

        const misWorkspaces = allWorkspaces.filter((ws: any) =>
          workspaceIds.includes(ws._id)
        )

        setWorkspaces(misWorkspaces)

      } catch (err) {
        console.error(err)
      }

    }

    fetchWorkspaces()

  }, [user])

  return (
    <Page>
      <Box>

        <Typography variant="h4" fontWeight="bold" mb={2}>
          Espacios de trabajo
        </Typography>


        {/* 🔥 LISTA */}
        {workspaces.map((ws) => (

          <Box
            key={ws._id}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              background: workspace?._id === ws._id ? "#e3f2fd" : "#f5f5f5",
              cursor: "pointer",
              border: workspace?._id === ws._id
                ? "2px solid #1976d2"
                : "1px solid #ddd"
            }}
            onClick={() => {
              setWorkspace(ws)
              console.log("🔄 Workspace cambiado:", ws)
            }}
          >
            <Typography fontWeight="bold">
              {ws.nombre}
            </Typography>

            <Typography variant="body2">
              ID: {ws._id}
            </Typography>

          </Box>

        ))}

      </Box>
    </Page>
  )
}

export default WorkspacesPage