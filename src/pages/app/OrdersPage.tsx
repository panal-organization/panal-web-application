import { useEffect, useState } from "react"
import { Page } from "../../templates"
import OrderDetailModal from "../../components/orders/OrderDetailModal"

import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import CreateOrderModal from "../../components/orders/CreateOrderModal"
import { useWorkspace } from "../../context/WorkspaceContext"
import DeleteOrderModal from "../../components/orders/DeleteOrderModal"

import "./OrdersPage.css"

interface Order {
  _id: string
  descripcion: string
  estado: string
  tipo_id: string
  articulo_id: string
  created_at: string
}

interface Tipo {
  _id: string
  nombre: string
}

interface Articulo {
  _id: string
  nombre: string
  almacen_id: any // 🔥 AGREGA ESTO
}
const OrdersPage: React.FC = () => {

  const { workspace } = useWorkspace()
  const [isEditOpen, setIsEditOpen] = useState(false)
const [orderToEdit, setOrderToEdit] = useState<any>(null)
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [tipos, setTipos] = useState<Tipo[]>([])
  const [articulos, setArticulos] = useState<Articulo[]>([])
  const [loading, setLoading] = useState(true)
  const [almacenes, setAlmacenes] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [estadoFiltro, setEstadoFiltro] = useState("ALL")
  const [tipoFiltro, setTipoFiltro] = useState("ALL")
  const [orden] = useState("ASC")
const [isDeleteOpen, setIsDeleteOpen] = useState(false)
const [orderToDelete, setOrderToDelete] = useState<any>(null)
  const [page, setPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    document.title = "Órdenes de servicio"
  }, [])

  useEffect(() => {

    if (!workspace?._id) return

    const fetchData = async () => {

      try {

  const [ordersRes, tiposRes, articulosRes, usuariosRes, almacenesRes] = await Promise.all([
  fetch(`/api/ordenes-servicio`, {
    headers: { "ngrok-skip-browser-warning": "true" }
  }),
  fetch(`/api/tipo-ordenes`, {
    headers: { "ngrok-skip-browser-warning": "true" }
  }),
  fetch(`/api/articulos`, {
    headers: { "ngrok-skip-browser-warning": "true" }
  }),
  fetch(`/api/usuarios`, {
    headers: { "ngrok-skip-browser-warning": "true" }
  }),
  fetch(`/api/almacen`, {
    headers: { "ngrok-skip-browser-warning": "true" }
  })
])


const almacenesData = await almacenesRes.json()
setAlmacenes(almacenesData.data || almacenesData)

const usuariosData = await usuariosRes.json()
setUsuarios(usuariosData)
        const ordersData = await ordersRes.json()
        const tiposData = await tiposRes.json()
        const articulosData = await articulosRes.json()

        const filtered = ordersData.filter((o: any) => {

  // ❌ ignorar órdenes sin workspace
  if (!o.workspace_id) return false

  // 🔥 comparar correctamente
  return String(o.workspace_id) === String(workspace._id)
})

console.log("Workspace actual:", workspace._id)
console.log("Órdenes filtradas:", filtered.length)

        setOrders(filtered)
        setTipos(tiposData)
        setArticulos(articulosData)

      } catch (err) {
        console.error("❌ Error:", err)
      } finally {
        setLoading(false)
      }

    }

    fetchData()

  }, [workspace])

const handleDeleteOrder = async () => {
  if (!orderToDelete) return

  try {
    await fetch(`/api/ordenes-servicio/${orderToDelete._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        is_deleted: true
      })
    })

    // 🔥 quitar de la UI
    setOrders(prev =>
      prev.filter(o => o._id !== orderToDelete._id)
    )

    // 🔥 cerrar modal
    setIsDeleteOpen(false)
    setOrderToDelete(null)

  } catch (error) {
    console.error("Error eliminando:", error)
  }
}

const openModal = (order: any) => {
  if (!usuarios.length) {
    console.log("usuarios aún no cargan")
    return
  }

  setSelectedOrder({
    ...order,
    usuario_nombre: getUsuarioNombre(order.created_by)
  })

  setIsModalOpen(true)
}

  const getTipoNombre = (id: string) =>
    tipos.find(t => t._id === id)?.nombre || "-"

  const getArticuloNombre = (id: string) =>
    articulos.find(a => a._id === id)?.nombre || "-"

  const getAlmacenFromArticulo = (articulo_id: string) => {
  const articulo = articulos.find(a => String(a._id) === String(articulo_id))
  if (!articulo) return "-"

  // 🔥 aquí el fix importante
  const almacenId = typeof articulo.almacen_id === "object"
    ? articulo.almacen_id._id
    : articulo.almacen_id

  const almacen = almacenes.find(a => String(a._id) === String(almacenId))

  return almacen?.nombre || "-"
}



const getUsuarioNombre = (id: string) =>
  usuarios.find(u => String(u._id) === String(id))?.nombre || "Usuario"

  const getEstadoClass = (estado: string) =>
    estado.toLowerCase()

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "RESUELTO":
        return <CheckCircleIcon fontSize="small" />
      case "EN_PROGRESO":
        return <HourglassBottomIcon fontSize="small" />
      case "PENDIENTE":
        return <RadioButtonUncheckedIcon fontSize="small" />
      default:
        return null
    }
  }

  let filteredOrders = orders.filter((order) => {

    const matchesSearch =
      order.descripcion.toLowerCase().includes(search.toLowerCase()) ||
      getTipoNombre(order.tipo_id).toLowerCase().includes(search.toLowerCase()) ||
      getArticuloNombre(order.articulo_id).toLowerCase().includes(search.toLowerCase())

    const matchesEstado =
      estadoFiltro === "ALL" || order.estado === estadoFiltro

    const matchesTipo =
      tipoFiltro === "ALL" || order.tipo_id === tipoFiltro

    return matchesSearch && matchesEstado && matchesTipo
  })

  filteredOrders = [...filteredOrders].sort((a, b) => {
  const valA = a.descripcion.toLowerCase()
  const valB = b.descripcion.toLowerCase()

  if (orden === "ASC") return valA.localeCompare(valB)
  return valB.localeCompare(valA)
})
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  return (

    <Page>

      <div className="orders-header">
        <h2 className="orders-title">
          <Inventory2Icon className="orders-title-icon"/>
          Gestión de órdenes
        </h2>
      </div>

      <div className="orders-toolbar">

        <div className="orders-filters">

          <div className="orders-search-container">
            <SearchIcon className="orders-search-icon"/>
            <input
              type="text"
              placeholder="Buscar..."
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
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
          >
            <option value="ALL">Todos los tipos</option>
            {tipos.map(t => (
              <option key={t._id} value={t._id}>
                {t.nombre}
              </option>
            ))}
          </select>

        

        </div>

        <button 
  className="orders-create-btn"
  onClick={() => setIsCreateOpen(true)}
>
  <AddIcon />
  Crear orden
</button>

      </div>

      <div className="orders-table">

        <div className="orders-table-header">
          <div>Tipo</div>
          <div>Descripción</div>
          <div>Estado</div>
          <div>Artículo</div>
          <div>Acciones</div>
        </div>

        {loading ? (

          <div className="orders-table-row loading">
            Cargando órdenes...
          </div>

        ) : paginatedOrders.length === 0 ? (

          <div className="orders-table-row loading">
            No hay órdenes
          </div>

        ) : (

          paginatedOrders.map((order) => (

            <div key={order._id} className="orders-table-row">

              <div className="tipo">{getTipoNombre(order.tipo_id)}</div>

              <div className="descripcion">{order.descripcion}</div>

              <div>
                <span className={`badge ${getEstadoClass(order.estado)}`}>
                  {getEstadoIcon(order.estado)}
                  {order.estado}
                </span>
              </div>

              <div>{getArticuloNombre(order.articulo_id)}</div>

              <div className="actions">

                <button 
                  className="btn view"
                  onClick={() => openModal(order)}
                >
                  👁 Ver
                </button>

                <button 
                  className="btn edit"
                  onClick={(e) => {
  e.stopPropagation()
  setOrderToEdit(order)
  setIsEditOpen(true)
}}
                >
                  <EditIcon fontSize="small" />
                  Editar
                </button>

                <button 
                  className="btn delete"
                  onClick={(e) => {
  e.stopPropagation()
  setOrderToDelete(order)
  setIsDeleteOpen(true)
}}
                >
                  <DeleteIcon fontSize="small" />
                  Eliminar
                </button>

              </div>

            </div>

          ))

        )}

      </div>

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

      {/* MODAL */}
     <OrderDetailModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  order={selectedOrder}
  getTipoNombre={getTipoNombre}
  getArticuloNombre={getArticuloNombre}
  getAlmacenFromArticulo={getAlmacenFromArticulo} // 🔥 ESTE
/>

<CreateOrderModal
  isOpen={isCreateOpen}
  onClose={() => setIsCreateOpen(false)}
  tipos={tipos}
  articulos={articulos}
  onSuccess={(newOrder: any) => {   // 🔥 CAMBIA ESTO
    setOrders(prev => [newOrder, ...prev])
  }}
/>

<CreateOrderModal
  isOpen={isEditOpen}
  onClose={() => {
    setIsEditOpen(false)
    setOrderToEdit(null)
  }}
  tipos={tipos}
  articulos={articulos}
  orderToEdit={orderToEdit}
  onSuccess={(updatedOrder: any) => {
    setOrders(prev =>
      prev.map(o => o._id === updatedOrder._id ? updatedOrder : o)
    )
  }}
/>

<DeleteOrderModal
  isOpen={isDeleteOpen}
  onClose={() => {
    setIsDeleteOpen(false)
    setOrderToDelete(null)
  }}
 onConfirm={handleDeleteOrder}
  order={orderToDelete}
/>
    </Page>

  )
}

export default OrdersPage