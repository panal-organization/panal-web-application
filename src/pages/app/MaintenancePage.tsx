import { useEffect, useState } from "react"
import { Page } from "../../templates"
import OrderDetailModal from "../../components/orders/OrderDetailModal"


import OrderCard from "../../components/orders/OrderCard"

import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import BuildIcon from "@mui/icons-material/Build"

import CreateOrderModal from "../../components/orders/CreateOrderModal"
import DeleteOrderModal from "../../components/orders/DeleteOrderModal"

import { useWorkspace } from "../../context/WorkspaceContext"

import "./OrdersPage.css"
import "./MaintenancePage.css"

interface Order {
  _id: string
  descripcion: string
  estado: string
  tipo_id: string
  articulo_id: string
  created_at: string
  workspace_id?: string
  is_deleted?: boolean
  created_by?: string
}

interface Tipo {
  _id: string
  nombre: string
}

interface Articulo {
  _id: string
  nombre: string
  almacen_id: any
}

const MaintenancePage: React.FC = () => {

  const { workspace } = useWorkspace()

  const [orders, setOrders] = useState<Order[]>([])
  const [tipos, setTipos] = useState<Tipo[]>([])
  const [articulos, setArticulos] = useState<Articulo[]>([])
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [almacenes, setAlmacenes] = useState<any[]>([])

  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [estadoFiltro, setEstadoFiltro] = useState("ALL")

  const [page, setPage] = useState(1)
  const itemsPerPage = 8

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [orderToEdit, setOrderToEdit] = useState<any>(null)

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<any>(null)

  useEffect(() => {
    document.title = "Mantenimiento"
  }, [])

  useEffect(() => {

    if (!workspace?._id) return

    const fetchData = async () => {

      try {

        const [ordersRes, tiposRes, articulosRes, usuariosRes, almacenesRes] = await Promise.all([
          fetch(`/api/ordenes-servicio`, { headers: { "ngrok-skip-browser-warning": "true" } }),
          fetch(`/api/tipo-ordenes`, { headers: { "ngrok-skip-browser-warning": "true" } }),
          fetch(`/api/articulos`, { headers: { "ngrok-skip-browser-warning": "true" } }),
          fetch(`/api/usuarios`, { headers: { "ngrok-skip-browser-warning": "true" } }),
          fetch(`/api/almacen`, { headers: { "ngrok-skip-browser-warning": "true" } })
        ])

        const ordersData = await ordersRes.json()
        const tiposData = await tiposRes.json()
        const articulosData = await articulosRes.json()
        const usuariosData = await usuariosRes.json()
        const almacenesData = await almacenesRes.json()

        setUsuarios(usuariosData)
        setAlmacenes(almacenesData.data || almacenesData)

        const tipoMantenimiento = tiposData.find(
          (t: Tipo) => t.nombre.toLowerCase() === "mantenimiento"
        )

        const filtered = ordersData.filter((o: Order) => {

          if (!o.workspace_id) return false
          if (o.is_deleted) return false

          const sameWorkspace =
            String(o.workspace_id) === String(workspace._id)

          const isMantenimiento =
            tipoMantenimiento && o.tipo_id === tipoMantenimiento._id

          return sameWorkspace && isMantenimiento
        })

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

  // DELETE
  const handleDeleteOrder = async () => {
    if (!orderToDelete) return

    await fetch(`/api/ordenes-servicio/${orderToDelete._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_deleted: true })
    })

    setOrders(prev => prev.filter(o => o._id !== orderToDelete._id))
    setIsDeleteOpen(false)
    setOrderToDelete(null)
  }

  // HELPERS
  const getTipoNombre = (id: string) =>
    tipos.find(t => t._id === id)?.nombre || "-"

  const getArticuloNombre = (id: string) =>
    articulos.find(a => a._id === id)?.nombre || "-"

  const getUsuarioNombre = (id: string) =>
    usuarios.find(u => String(u._id) === String(id))?.nombre || "Usuario"

  const getAlmacenFromArticulo = (articulo_id: string) => {
    const articulo = articulos.find(a => String(a._id) === String(articulo_id))
    if (!articulo) return "-"

    const almacenId = typeof articulo.almacen_id === "object"
      ? articulo.almacen_id._id
      : articulo.almacen_id

    const almacen = almacenes.find(a => String(a._id) === String(almacenId))

    return almacen?.nombre || "-"
  }

  // MODAL FIX
  const openModal = (order: any) => {
    if (!usuarios.length) return

    setSelectedOrder({
      ...order,
      usuario_nombre: getUsuarioNombre(order.created_by)
    })

    setIsModalOpen(true)
  }

  // FILTROS
  let filteredOrders = orders.filter(order => {

    const matchesSearch =
      order.descripcion.toLowerCase().includes(search.toLowerCase()) ||
      getTipoNombre(order.tipo_id).toLowerCase().includes(search.toLowerCase())

    const matchesEstado =
      estadoFiltro === "ALL" || order.estado === estadoFiltro

    return matchesSearch && matchesEstado
  })

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  return (

    <Page>

      {/* HEADER */}
      <div className="orders-header">
        <h2 className="orders-title">
          <BuildIcon  className="orders-title-icon"/>
          Órdenes de mantenimiento
        </h2>
      </div>

      {/* TOOLBAR */}
      {/* TOOLBAR */}
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

  </div>

  <button
    className="orders-create-btn"
    onClick={() => setIsCreateOpen(true)}
  >
    <AddIcon />
    Crear orden
  </button>

</div>

{/* ✅ AQUÍ VA EL TOTAL */}
<div
  className="tickets-total"
  style={{ marginTop: "0px", marginBottom: "12px" }}
>
  Total de órdenes: <strong>{filteredOrders.length}</strong>
</div>


      {/* CARDS */}
      <div className="orders-list">

        {loading ? (
          <div>Cargando órdenes...</div>
        ) : paginatedOrders.length === 0 ? (
          <div>No hay órdenes de mantenimiento</div>
        ) : (

          paginatedOrders.map(order => (

            <OrderCard
              key={order._id}
              order={order}
              getTipoNombre={getTipoNombre}
              getArticuloNombre={getArticuloNombre}
              onView={openModal}
              onEdit={(order: any) => {
                setOrderToEdit(order)
                setIsEditOpen(true)
              }}
              onDelete={(order: any) => {
                setOrderToDelete(order)
                setIsDeleteOpen(true)
              }}
            />

          ))

        )}

      </div>

      {/* PAGINACIÓN */}
     <div className="pagination-container">

  {/* BOTÓN ANTERIOR */}
  <button
    className="page-btn"
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    {"<"}
  </button>

  {/* NÚMEROS */}
  {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map(p => (
    <button
      key={p}
      className={`page-btn ${page === p ? "active" : ""}`}
      onClick={() => setPage(p)}
    >
      {p}
    </button>
  ))}

  {/* BOTÓN SIGUIENTE */}
  <button
    className="page-btn"
    disabled={page === totalPages || totalPages === 0}
    onClick={() => setPage(page + 1)}
  >
    {">"}
  </button>

</div>

      {/* MODALES */}
      <OrderDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        getTipoNombre={getTipoNombre}
        getArticuloNombre={getArticuloNombre}
        getAlmacenFromArticulo={getAlmacenFromArticulo}
      />

      <CreateOrderModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        tipos={tipos}
        articulos={articulos}
        onSuccess={(newOrder: any) => {

  const tipoMantenimiento = tipos.find(
    (t) => t.nombre.toLowerCase() === "mantenimiento"
  )

  const isMantenimiento =
    tipoMantenimiento && newOrder.tipo_id === tipoMantenimiento._id

  if (!isMantenimiento) return // 🚫 NO LO METAS

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
        onSuccess={(updated: any) => {
          setOrders(prev =>
            prev.map(o => o._id === updated._id ? updated : o)
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

export default MaintenancePage
