import { Box, Typography } from "@mui/material"
import { Page } from "../../templates"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

// 🔥 COMPONENTE
import ArticuloCard from "../../components/inventory/ArticuloCard"

// 🔥 ICONOS
import Inventory2Icon from "@mui/icons-material/Inventory2"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import WidgetsIcon from "@mui/icons-material/Widgets"
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone"
import LaptopMacIcon from "@mui/icons-material/LaptopMac"

// 🔥 estilos reutilizados
import "./OrdersPage.css"
import "./TicketsPage.css"

/* =========================
ICONO DINÁMICO
========================= */
const getIcon = (icono: string) => {
  const props = { sx: { fontSize: 20 } }

  switch (icono) {
    case "widgets":
      return <WidgetsIcon {...props} />
    case "mobile":
      return <PhoneIphoneIcon {...props} />
    case "laptop":
      return <LaptopMacIcon {...props} />
    default:
      return <WidgetsIcon {...props} />
  }
}

const InventoryDetailPage: React.FC = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [articulos, setArticulos] = useState<any[]>([])
  const [almacen, setAlmacen] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  // 🔥 PAGINACIÓN
  const [page, setPage] = useState(1)
  const itemsPerPage = 4

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {

    const fetchData = async () => {
      try {
        if (!id) return

        const [articulosRes, almacenesRes] = await Promise.all([
          fetch(`/api/articulos`, {
            headers: { "ngrok-skip-browser-warning": "true" }
          }),
          fetch(`/api/almacen`, {
            headers: { "ngrok-skip-browser-warning": "true" }
          })
        ])

        const articulosData = await articulosRes.json()
        const almacenesData = await almacenesRes.json()

        const articulosLista = articulosData.data || articulosData
        const almacenesLista = almacenesData.data || almacenesData

        const filtrados = articulosLista.filter(
          (a: any) => String(a.almacen_id) === String(id)
        )

        setArticulos(filtrados)

        const actual = almacenesLista.find(
          (a: any) => String(a._id) === String(id)
        )

        setAlmacen(actual)

      } catch (error) {
        console.error("Error cargando data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

  }, [id])

  /* =========================
     FILTRO
  ========================= */
  const filtered = articulos.filter((a) =>
    a.nombre?.toLowerCase().includes(search.toLowerCase())
  )

  // 🔥 RESET PAGE AL BUSCAR
  useEffect(() => {
    setPage(1)
  }, [search])

  // 🔥 PAGINACIÓN
  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  return (
    <Page>
      <Box>

        {/* HEADER */}
        <div className="orders-header">
          <h2 className="orders-title">
            <Inventory2Icon className="orders-title-icon" />
            Artículos
          </h2>
        </div>

        {/* TOOLBAR */}
        <div className="orders-toolbar">

          <div className="orders-filters">
            <div className="orders-search-container">
              <SearchIcon className="orders-search-icon" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                className="orders-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <Box display="flex" gap={1}>
            <button
              className="btn-secondary"
              onClick={() => navigate("/inventory")}
            >
              Volver
            </button>

            <button
              className="orders-create-btn"
              onClick={() => console.log("abrir modal")}
            >
              <AddIcon />
              Nuevo artículo
            </button>
          </Box>

        </div>

        {/* INFO ALMACÉN */}
        {almacen && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 1,
              px: 1
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: "#e0f2fe",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {getIcon(almacen.icono)}
            </Box>

            <Typography fontSize="15px" fontWeight="600">
              {almacen.nombre}
            </Typography>
          </Box>
        )}

        {/* TOTAL */}
        <div className="tickets-total" style={{ margin: "20px 0", marginLeft: "10px"}}>
          Total de artículos: <strong>{filtered.length}</strong>
        </div>

        {/* LISTA */}
        <Box className="tickets-container">

          {loading && (
            <div className="tickets-loading">Cargando artículos...</div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="tickets-empty">No hay artículos</div>
          )}

          {!loading && filtered.length > 0 && (
            paginated.map((item: any) => (
              <ArticuloCard
                key={item._id}
                item={item}
                onEdit={(item: any) => console.log("editar", item)}
                onDelete={(item: any) => console.log("eliminar", item)}
              />
            ))
          )}

        </Box>

        {/* 🔥 PAGINACIÓN (MISMO ESTILO) */}
        {totalPages > 0 && (
          <div className="pagination-container">

            <button
              className="page-btn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              {"<"}
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p =>
                p === 1 ||
                p === totalPages ||
                Math.abs(p - page) <= 1
              )
              .map((p, i, arr) => {

                const prev = arr[i - 1]

                return (
                  <span key={p} className="page-group">

                    {prev && p - prev > 1 && (
                      <span className="dots">...</span>
                    )}

                    <button
                      className={`page-btn ${page === p ? "active" : ""}`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>

                  </span>
                )
              })}

            <button
              className="page-btn"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              {">"}
            </button>

          </div>
        )}

      </Box>
    </Page>
  )
}

export default InventoryDetailPage