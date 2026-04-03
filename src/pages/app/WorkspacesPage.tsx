import { Box } from "@mui/material"
import { Page } from "../../templates"
import { useEffect, useState } from "react"
import JoinWorkspaceModal from "../../components/workspace/JoinWorkspaceModal"

// 🔥 ICONOS
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import StorefrontIcon from "@mui/icons-material/Storefront"
import CloseIcon from "@mui/icons-material/Close"
import GroupsIcon from "@mui/icons-material/Groups"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"

// 🔥 CONTEXTOS
import { useWorkspace } from "../../context/WorkspaceContext"
import { useAuth } from "../../context/AuthContext"

// 🔥 COMPONENTE
import WorkCard from "../../components/workspace/WorkCard"

// 🔥 estilos
import "./OrdersPage.css"
import "./TicketsPage.css"
import "../../components/workspace/Workspace.css"

const WorkspacesPage: React.FC = () => {

  const { user } = useAuth()

  const FREE_PLAN_ID = "69a3de4281a5be4cb1bd8bc0"

const isPremium = user?.plan_id !== FREE_PLAN_ID


  const { workspace, setWorkspace } = useWorkspace()
const [openJoinModal, setOpenJoinModal] = useState(false)
  const [workspaces, setWorkspaces] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  const [typeFilter, setTypeFilter] = useState<"all" | "personal" | "team">("all")

  // 🔥 MODAL
  const [openOptionsModal, setOpenOptionsModal] = useState(false)

  useEffect(() => {
    document.title = "Workspaces"
  }, [])

  /* =========================
     FETCH
  ========================= */
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
        console.error("Error cargando workspaces:", err)
      } finally {
        setLoading(false)
      }

    }

    fetchWorkspaces()

  }, [user])

  /* =========================
     FILTRO
  ========================= */
  const filtered = workspaces
    .filter((ws) =>
      ws.nombre?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((ws) => {

      if (typeFilter === "all") return true

      const isPersonal = ws.admin_id === user?._id

      if (typeFilter === "personal") return isPersonal
      if (typeFilter === "team") return !isPersonal

      return true
    })
    .sort((a, b) => a.nombre.localeCompare(b.nombre))

  return (
    <Page>
      <Box>

        {/* HEADER */}
        <div className="orders-header">
          <h2 className="orders-title">
            <GroupsIcon className="orders-title-icon" />
            Espacios de trabajo
          </h2>
        </div>

        {/* TOOLBAR */}
        <div className="orders-toolbar">

          <div className="orders-filters">
            <div className="orders-search-container">
              <SearchIcon className="orders-search-icon" />
              <input
                type="text"
                placeholder="Buscar workspaces..."
                className="orders-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* SELECT FILTRO */}
          <div className="workspace-select-filter">
            <select
              className="workspace-select"
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as "all" | "personal" | "team")
              }
            >
              <option value="all">Todos</option>
              <option value="personal">Personal</option>
              <option value="team">Equipos</option>
            </select>
          </div>

          {/* BOTÓN */}
          <button 
            className="orders-create-btn"
            onClick={() => setOpenOptionsModal(true)}
          >
            <AddIcon />
            Nuevo workspace
          </button>

        </div>

        {/* TOTAL */}
        <div className="tickets-total">
          Total de workspaces: <strong>{filtered.length}</strong>
        </div>

        {/* LISTA */}
        <Box className="tickets-container">

          {loading && (
            <div className="tickets-loading">Cargando...</div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="tickets-empty">
              No hay workspaces
            </div>
          )}

          {!loading && filtered.map((ws) => (
            <WorkCard
              key={ws._id}
              workspace={ws}
              isActive={workspace?._id === ws._id}
              onClick={() => {
                setWorkspace(ws)
                console.log("🔄 Workspace cambiado:", ws)
              }}
            />
          ))}

        </Box>

        {/* =========================
           MODAL OPCIONES
        ========================= */}
        {openOptionsModal && (
          <div className="workspace-modal-overlay">
            <div className="workspace-modal">

              <div className="workspace-modal-header">
                <h3>Elije una opción</h3>
              </div>

              <div className="workspace-modal-body">

                {/* UNIRSE */}
              <div
  className="workspace-option-card"
  onClick={() => {
    setOpenOptionsModal(false)
    setOpenJoinModal(true)
  }}
>
                  <GroupAddIcon className="workspace-option-icon" />

                  <div>
                    <div className="workspace-option-title">
                      Unirse a un espacio existente
                    </div>
                    <div className="workspace-option-sub">
                      Usa un código de invitación
                    </div>
                  </div>
                </div>

               {/* CREAR */}
<div
  className="workspace-option-card"
  onClick={() => {
    if (!isPremium) return

    console.log("Crear workspace")
    setOpenOptionsModal(false)
  }}
  style={{
    opacity: isPremium ? 1 : 0.5,
    cursor: isPremium ? "pointer" : "not-allowed"
  }}
>
                  <StorefrontIcon className="workspace-option-icon" />

                  <div>
                    <div className="workspace-option-title">
                      Crear un nuevo espacio
                    </div>
                    <div
  className="workspace-option-sub"
  style={{
    color: isPremium ? "#666" : "#e53935"
  }}
>
  {isPremium
    ? "Conviértete en el administrador de tu nuevo grupo de trabajo"
    : "Disponible solo en Plan Premium"}
</div>
                  </div>
                </div>

              </div>

              <button
                className="workspace-close-btn"
                onClick={() => setOpenOptionsModal(false)}
              >
                <CloseIcon style={{ fontSize: 18 }} />
                Cancelar
              </button>

            </div>
          </div>
        )}
<JoinWorkspaceModal
  isOpen={openJoinModal}
  onClose={() => setOpenJoinModal(false)}
  user={user}
  onJoined={() => {
  //  window.location.reload()
  }}
/>
      </Box>
    </Page>
  )
}

export default WorkspacesPage