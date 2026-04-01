import { Box } from "@mui/material"
import { Page } from "../../templates"
import { useEffect, useState } from "react"


import TicketCard from "../../components/tickets/TicketCard"
import TicketDetailModal from "../../components/tickets/TicketDetailModal"
import CreateTicketModal from "../../components/tickets/CreateTicketModal"

import AssignmentIcon from "@mui/icons-material/Assignment"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"

import { useWorkspace } from "../../context/WorkspaceContext"

import "./OrdersPage.css"
import "./TicketsPage.css"

const TicketsPage: React.FC = () => {

  const { workspace } = useWorkspace()

  const [usuarios, setUsuarios] = useState<any[]>([]) // 🔥 IMPORTANTE

  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const [tickets, setTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [estadoFiltro, setEstadoFiltro] = useState("ALL")
  const [prioridadFiltro, setPrioridadFiltro] = useState("ALL")
  const [categoriaFiltro, setCategoriaFiltro] = useState("ALL")

  const [page, setPage] = useState(1)
  const itemsPerPage = 4

  // 🔥 OBTENER NOMBRE USUARIO (igual que orders)
  const getUsuarioNombre = (id: string) =>
    usuarios.find(u => String(u._id) === String(id))?.nombre || "Usuario"

  // 🔥 ABRIR MODAL (AQUÍ ESTÁ LA MAGIA)
  const openDetail = (ticket: any) => {

    if (!usuarios.length) return

    setSelectedTicket({
      ...ticket,
      usuario_nombre: getUsuarioNombre(ticket.created_by)
    })

    setIsDetailOpen(true)
  }

  useEffect(() => {
    document.title = "Tickets"
  }, [])

  // 🔥 FETCH
  useEffect(() => {

    if (!workspace?._id) return

    const fetchData = async () => {

      try {

        const [ticketsRes, usuariosRes] = await Promise.all([
          fetch(`/api/tickets`, {
            headers: { "ngrok-skip-browser-warning": "true" }
          }),
          fetch(`/api/usuarios`, {
            headers: { "ngrok-skip-browser-warning": "true" }
          })
        ])

        const ticketsData = await ticketsRes.json()
        const usuariosData = await usuariosRes.json()

        setUsuarios(usuariosData)

        const filtrados = ticketsData.filter((t: any) => {
          return (
            t.workspace_id &&
            !t.is_deleted &&
            String(t.workspace_id) === String(workspace._id)
          )
        })

        setTickets(filtrados)

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }

    }

    fetchData()

  }, [workspace])

  // 🔥 FILTROS
  const ticketsFiltrados = tickets.filter((t) => {

    const matchesSearch =
      t.titulo?.toLowerCase().includes(search.toLowerCase()) ||
      t.descripcion?.toLowerCase().includes(search.toLowerCase())

    const matchesEstado =
      estadoFiltro === "ALL" || t.estado === estadoFiltro

    const matchesPrioridad =
      prioridadFiltro === "ALL" || t.prioridad === prioridadFiltro

      const matchesCategoria =
  categoriaFiltro === "ALL" || t.categoria === categoriaFiltro
return (
  matchesSearch &&
  matchesEstado &&
  matchesPrioridad &&
  matchesCategoria
)
  })

  useEffect(() => {
    setPage(1)
 }, [search, estadoFiltro, prioridadFiltro, categoriaFiltro])

  const totalPages = Math.ceil(ticketsFiltrados.length / itemsPerPage)

  const paginatedTickets = ticketsFiltrados.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  return (
    <Page>
      <Box>

        {/* HEADER */}
        <div className="orders-header">
          <h2 className="orders-title">
            <AssignmentIcon className="orders-title-icon"/>
            Gestión de tickets
          </h2>
        </div>

        {/* TOOLBAR */}
        <div className="orders-toolbar">

          <div className="orders-filters">

            <div className="orders-search-container">
              <SearchIcon className="orders-search-icon"/>
              <input
                type="text"
                placeholder="Buscar tickets..."
                className="orders-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="orders-select"
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
            >
              <option value="ALL">Todos</option>
              <option value="PENDIENTE">Pendiente</option>
              <option value="EN_PROGRESO">En progreso</option>
              <option value="RESUELTO">Resuelto</option>
            </select>

            <select
              className="orders-select"
              value={prioridadFiltro}
              onChange={(e) => setPrioridadFiltro(e.target.value)}
            >
              <option value="ALL">Todas las prioridades</option>
              <option value="BAJA">Baja</option>
              <option value="MEDIA">Media</option>
              <option value="ALTA">Alta</option>
              <option value="CRITICA">Crítica</option>
            </select>

            <select
  className="orders-select"
  value={categoriaFiltro}
  onChange={(e) => setCategoriaFiltro(e.target.value)}
>
  <option value="ALL">Todas las categorías</option>
  <option value="SOPORTE">Soporte</option>
  <option value="BUG">Bug</option>
  <option value="MEJORA">Mejora</option>
  <option value="MANTENIMIENTO">Mantenimiento</option>
</select>

          </div>

          <button 
            className="orders-create-btn"
            onClick={() => setIsCreateOpen(true)}
          >
            <AddIcon />
            Crear ticket
          </button>

        </div>

        {/* CONTENIDO */}
        <div className="tickets-total">
  Total de tickets: <strong>{ticketsFiltrados.length}</strong>
</div>
        <Box className="tickets-container">

          {loading && (
            <div className="tickets-loading">
              Cargando tickets...
            </div>
          )}

          {!loading && ticketsFiltrados.length === 0 && (
            <div className="tickets-empty">
              No hay tickets
            </div>
          )}

          {!loading && ticketsFiltrados.length > 0 && (
            paginatedTickets.map(t => (
              <TicketCard
                key={t._id}
                ticket={t}
                onClick={openDetail}
              />
            ))
          )}

        </Box>

        {/* PAGINACIÓN */}
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

                    {prev && p - prev > 1 && <span className="dots">...</span>}

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


        {/* MODAL DETALLE */}
        <TicketDetailModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          ticket={selectedTicket}
        />

        <CreateTicketModal
  isOpen={isCreateOpen}
  onClose={() => setIsCreateOpen(false)}
  onSuccess={(newTicket: any) => {
    setTickets(prev => [newTicket, ...prev])
  }}
/>

      </Box>
    </Page>
  )
}

export default TicketsPage