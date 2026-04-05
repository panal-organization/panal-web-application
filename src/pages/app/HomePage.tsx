import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { Page } from "../../templates"
import { useWorkspace } from "../../context/WorkspaceContext"
import { useNavigate } from "react-router-dom"

import HomeIcon from "@mui/icons-material/Home"
import DashboardCard from "../../components/dashboard/DashboardCard"

import {
  getLastItem,
  getMaintenanceStatus,
  getLastWarehouse,
  getLastArticle
} from "../../services/dashboardService"

import "./HomePage.css"

const HomePage: React.FC = () => {
  const { workspace } = useWorkspace()
  const navigate = useNavigate()

  const [lastTicket, setLastTicket] = useState<any>(null)
  const [lastOrder, setLastOrder] = useState<any>(null)
  const [lastWarehouse, setLastWarehouse] = useState<any>(null)
  const [lastArticle, setLastArticle] = useState<any>(null)
  const [maintenance, setMaintenance] = useState<any>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "Inicio"
  }, [])

  useEffect(() => {
    if (!workspace?._id) return

    const fetchDataDashboard = async () => {
      try {
        setLoading(true)

        const [
          ticket,
          order,
          warehouse,
          article,
          maintenanceData
        ] = await Promise.all([
          getLastItem("tickets", workspace._id),
          getLastItem("ordenes-servicio", workspace._id),
          getLastWarehouse(workspace._id),
          getLastArticle(workspace._id),
          getMaintenanceStatus(workspace._id)
        ])

        setLastTicket(ticket)
        setLastOrder(order)
        setLastWarehouse(warehouse)
        setLastArticle(article)
        setMaintenance(maintenanceData)

      } catch (error) {
        console.error("Error dashboard:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDataDashboard()
  }, [workspace])

  return (
    <Page>
      <Box>

        {/* HEADER */}
        <div className="orders-header">
          <h2 className="orders-title">
            <HomeIcon className="orders-title-icon" />
            Inicio - {workspace?.nombre}
          </h2>
        </div>

        {/* GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)"
            },
            gap: 2,
            mt: 2
          }}
        >

          {/* 🎫 TICKET */}
          <DashboardCard title="Último ticket">
            <div className="card-content">
              {loading ? <p>Cargando...</p> :
                lastTicket ? (
                  <>
                    <p><strong>{lastTicket.titulo}</strong></p>
                    <p>{lastTicket.descripcion}</p>
                  </>
                ) : <p>Sin datos</p>}

              <button
                className="card-button"
                onClick={() => navigate("/tickets")}
              >
                Ver tickets
              </button>
            </div>
          </DashboardCard>

          {/* 🛠️ MANTENIMIENTO */}
          <DashboardCard title="Mantenimiento">
            <div className="card-content">
              {loading ? <p>Cargando...</p> :
                maintenance ? (
                  <>
                    <p><strong>{maintenance.descripcion}</strong></p>
                    <p>{maintenance.estado}</p>
                  </>
                ) : <p>Sin datos</p>}

              <button
                className="card-button"
                onClick={() => navigate("/maintenance")}
              >
                Ver mantenimiento
              </button>
            </div>
          </DashboardCard>

          {/* 📦 ORDEN */}
          <DashboardCard title="Última orden">
            <div className="card-content">
              {loading ? <p>Cargando...</p> :
                lastOrder ? (
                  <p><strong>{lastOrder.descripcion}</strong></p>
                ) : <p>Sin datos</p>}

              <button
                className="card-button"
                onClick={() => navigate("/orders")}
              >
                Ver órdenes
              </button>
            </div>
          </DashboardCard>

          {/* 🏢 ALMACÉN */}
          <DashboardCard title="Último almacén">
            <div className="card-content">
              {loading ? <p>Cargando...</p> :
                lastWarehouse ? (
                  <p><strong>{lastWarehouse.nombre}</strong></p>
                ) : <p>Sin datos</p>}

              <button
                className="card-button"
                onClick={() => navigate("/inventory")}
              >
                Ver almacén
              </button>
            </div>
          </DashboardCard>

          {/* 📦 ARTÍCULO */}
          <DashboardCard title="Último artículo">
            <div className="card-content">
              {loading ? <p>Cargando...</p> :
                lastArticle ? (
                  <p><strong>{lastArticle.nombre}</strong></p>
                ) : <p>Sin datos</p>}

              <button
                className="card-button"
                onClick={() => navigate("/articulos")}
              >
                Ver artículos
              </button>
            </div>
          </DashboardCard>

        </Box>
      </Box>
    </Page>
  )
}

export default HomePage