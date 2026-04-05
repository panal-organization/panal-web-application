import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { Page } from "../../templates"
import { useWorkspace } from "../../context/WorkspaceContext"

// 🔥 ICONO
import HomeIcon from "@mui/icons-material/Home"

// 🔥 COMPONENTE CARD
import DashboardCard from "../../components/dashboard/DashboardCard"

// 🔥 SERVICE
import { getLastItem } from "../../services/dashboardService"

const HomePage: React.FC = () => {

  const { workspace } = useWorkspace()

  // 🔥 STATES
  const [lastTicket, setLastTicket] = useState<any>(null)
  const [lastUser, setLastUser] = useState<any>(null)
  const [lastWorkspace, setLastWorkspace] = useState<any>(null)

  // 🔥 TITLE
  useEffect(() => {
    document.title = "Inicio"
  }, [])

  // 🔥 DEBUG
  useEffect(() => {
    console.log("🌍 Workspace global:", workspace)
  }, [workspace])

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {

      const ticket = await getLastItem("tickets")
      const user = await getLastItem("usuarios")
      const workspaceData = await getLastItem("workspaces")

      setLastTicket(ticket)
      setLastUser(user)
      setLastWorkspace(workspaceData)
    }

    fetchData()
  }, [])

  return (
    <Page>
      <Box>

        {/* 🔥 HEADER */}
        <div className="orders-header">
          <h2 className="orders-title">
            <HomeIcon className="orders-title-icon" />
            Inicio
          </h2>
        </div>

        {/* 🔥 CARDS */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 2,
            mt: 2
          }}
        >

          {/* 🎫 TICKET */}
          <DashboardCard title="Último ticket">
            {lastTicket ? (
              <>
                <p><strong>{lastTicket.titulo}</strong></p>
                <p>{lastTicket.descripcion}</p>
              </>
            ) : (
              <p>Cargando...</p>
            )}
          </DashboardCard>

          {/* 👤 USUARIO */}
          <DashboardCard title="Último usuario">
            {lastUser ? (
              <>
                <p><strong>{lastUser.nombre}</strong></p>
                <p>{lastUser.email}</p>
              </>
            ) : (
              <p>Cargando...</p>
            )}
          </DashboardCard>

          {/* 🏢 WORKSPACE */}
          <DashboardCard title="Último workspace">
            {lastWorkspace ? (
              <>
                <p><strong>{lastWorkspace.nombre}</strong></p>
              </>
            ) : (
              <p>Cargando...</p>
            )}
          </DashboardCard>

        </Box>

      </Box>
    </Page>
  )
}

export default HomePage