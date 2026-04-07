import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { Page } from "../../templates"
import { useWorkspace } from "../../context/WorkspaceContext"
import { useNavigate } from "react-router-dom"

// 🔥 ICONOS BASE
import HomeIcon from "@mui/icons-material/Home"
import BuildIcon from "@mui/icons-material/Build"
import {
  Assignment as TicketsIcon,
  ListAlt as OrdersIcon2,
  GridView as InventoryIcon
} from "@mui/icons-material"


// 🔥 ICONOS DE ALMACÉN
import WidgetsIcon from "@mui/icons-material/Widgets"
import InventoryIcon2 from "@mui/icons-material/Inventory2"
import CategoryIcon from "@mui/icons-material/Category"
import ViewListIcon from "@mui/icons-material/ViewList"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import LaptopMacIcon from "@mui/icons-material/LaptopMac"
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows"
import RouterIcon from "@mui/icons-material/Router"
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone"
import PrintIcon from "@mui/icons-material/Print"
import MemoryIcon from "@mui/icons-material/Memory"
import SettingsIcon from "@mui/icons-material/Settings"
import FactoryIcon from "@mui/icons-material/Factory"
import AppsIcon from "@mui/icons-material/Apps"
import ScienceIcon from "@mui/icons-material/Science"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import DashboardCard from "../../components/dashboard/DashboardCard"

import {
  getLastItem,
  getMaintenanceStatus,
  getLastWarehouse,
  getLastArticle
} from "../../services/dashboardService"

import "./HomePage.css"

// 🔥 MAPA DE ICONOS
const iconMap: any = {
  widgets: <WidgetsIcon />,
  inventory: <Inventory2Icon />,
  category: <CategoryIcon />,
  list: <ViewListIcon />,
  truck: <LocalShippingIcon />,
  laptop: <LaptopMacIcon />,
  desktop: <DesktopWindowsIcon />,
  router: <RouterIcon />,
  mobile: <PhoneIphoneIcon />,
  printer: <PrintIcon />,
  chip: <MemoryIcon />,
  settings: <SettingsIcon />,
  tools: <BuildIcon />,
  factory: <FactoryIcon />,
  apps: <AppsIcon />,
  lab: <ScienceIcon />
}

// 🔥 helper seguro para iconos
const getWarehouseIcon = (iconName?: string) => {
  if (!iconName) return <InventoryIcon  />

  const key = iconName.trim().toLowerCase()

  return iconMap[key] || <InventoryIcon  />
}

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
            gap: 3,
            rowGap: "60px",
            mt: 2,
            mb: 4
          }}
        >

          {/* 🎫 TICKET */}
          <DashboardCard title="Ticket más reciente" icon={<TicketsIcon  />} iconColor="orange">
            <div className="card-content">
              {loading ? <p>Cargando...</p> :
                lastTicket ? (
                  <>
                    <p><strong>{lastTicket.titulo}</strong></p>
                    <p>{lastTicket.descripcion}</p>
                  </>
                ) : <p>Sin datos</p>}

              <button className="card-button" onClick={() => navigate("/tickets")}>
                Ver más
              </button>
            </div>
          </DashboardCard>

          {/* 🛠️ MANTENIMIENTO */}
          <DashboardCard title="Mantenimiento reciente" icon={<BuildIcon />} iconColor="orange">
            <div className="card-content">
              {loading ? <p>Cargando...</p> :
                maintenance ? <p>{maintenance.descripcion}</p> : <p>Sin datos</p>}

              <button className="card-button" onClick={() => navigate("/maintenance")}>
                Ver más
              </button>
            </div>
          </DashboardCard>

          {/* 📦 ORDEN */}
          <DashboardCard title="Orden más reciente" icon={<OrdersIcon2  />} iconColor="orange">
            <div className="card-content">
              {loading ? <p>Cargando...</p> :
                lastOrder ? <p>{lastOrder.descripcion}</p> : <p>Sin datos</p>}

              <button className="card-button" onClick={() => navigate("/orders")}>
                Ver más
              </button>
            </div>
          </DashboardCard>

{/* 🏢 ALMACÉN */}
<DashboardCard
  title="Último almacén"
  icon={<InventoryIcon />} // 🔥 deja uno fijo arriba
  iconColor="orange"
>
  <div className="card-content">
    {loading ? <p>Cargando...</p> :
      lastWarehouse ? (
    <div className="card-warehouse-preview">

  <div>
    <p><strong>{lastWarehouse.nombre}</strong></p>
  </div>

  <div className="card-warehouse-icon-bottom">
    {getWarehouseIcon(lastWarehouse.icono)}
  </div>

</div>
      ) : <p>Sin datos</p>}

    <button
      className="card-button"
      onClick={() => navigate("/inventory")}
    >
      Ver más
    </button>
  </div>
</DashboardCard>



          {/* 📦 ARTÍCULO */}
          <DashboardCard title="Último artículo" icon={<InventoryIcon2 />} iconColor="orange">
          <div className="card-content">
  {loading ? (
    <p>Cargando...</p>
  ) : lastArticle ? (
    <>
      <p><strong>{lastArticle.nombre}</strong></p>

      {/* 🔥 IMAGEN ABAJO IZQUIERDA */}
      {lastArticle.foto && (
        <img
          src={lastArticle.foto}
          alt={lastArticle.nombre}
          className="card-article-img-bottom"
        />
      )}
    </>
  ) : (
    <p>Sin datos</p>
  )}

  <button
    className="card-button"
    onClick={() => {
      if (!lastArticle) return
      navigate(`/inventory/${lastArticle.almacen_id}?article=${lastArticle._id}`)
    }}
  >
    Ver más
  </button>
</div>
</DashboardCard>

        </Box>
      </Box>
    </Page>
  )
}

export default HomePage