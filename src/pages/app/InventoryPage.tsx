import { Box } from "@mui/material"
import { Page } from "../../templates"
import { useState, useEffect } from "react"
import AlmacenCard from "../../components/inventory/AlmacenCard"
import { useNavigate } from "react-router-dom"

// 🔥 CONTEXTOS
import { useWorkspace } from "../../context/WorkspaceContext"

// 🔥 ICONOS
import WidgetsIcon from "@mui/icons-material/Widgets"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"

// 🔥 estilos reutilizados
import "./OrdersPage.css"
import "./TicketsPage.css"

const InventoryPage: React.FC = () => {

  const [search, setSearch] = useState("")
  const [almacenes, setAlmacenes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 🔥 PAGINACIÓN
  const [page, setPage] = useState(1)
  const itemsPerPage = 4

  const { workspace } = useWorkspace()
  const navigate = useNavigate()

  const handleClickAlmacen = (almacen: any) => {
    navigate(`/inventory/${almacen._id}`)
  }

  useEffect(() => {
    document.title = "Almacén"
  }, [])

  /* =========================
     FETCH
  ========================= */
  useEffect(() => {

    const fetchAlmacenes = async () => {
      try {
        if (!workspace?._id) return

        const res = await fetch(`/api/almacen`, {
          headers: { "ngrok-skip-browser-warning": "true" }
        })

        const data = await res.json()
        const lista = data.data || data

        const filtrados = lista.filter((a: any) => {
          return (
            a.workspace_id &&
            String(a.workspace_id) === String(workspace._id)
          )
        })

        setAlmacenes(filtrados)

      } catch (error) {
        console.error("Error cargando almacenes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAlmacenes()

  }, [workspace])

  /* =========================
     FILTRO
  ========================= */
  const filtered = almacenes.filter((a) =>
    a.nombre?.toLowerCase().includes(search.toLowerCase())
  )

  // 🔥 RESET PAGE CUANDO BUSCAS
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
            <WidgetsIcon className="orders-title-icon" />
            Almacén
          </h2>
        </div>

        {/* TOOLBAR */}
        <div className="orders-toolbar">

          <div className="orders-filters">

            <div className="orders-search-container">
              <SearchIcon className="orders-search-icon" />
              <input
                type="text"
                placeholder="Buscar almacenes..."
                className="orders-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

          </div>

          <button className="orders-create-btn">
            <AddIcon />
            Nuevo almacén
          </button>

        </div>

        {/* TOTAL */}
        <div className="tickets-total">
          Total de almacenes: <strong>{filtered.length}</strong>
        </div>

        {/* LISTA */}
        <Box className="tickets-container">

          {loading && (
            <div className="tickets-loading">Cargando...</div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="tickets-empty">No hay almacenes</div>
          )}

          {!loading && filtered.length > 0 && (
            paginated.map((almacen: any) => (
              <AlmacenCard
                key={almacen._id}
                almacen={almacen}
                onClick={handleClickAlmacen}
              />
            ))
          )}

        </Box>

        {/* 🔥 PAGINACIÓN */}
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

export default InventoryPage