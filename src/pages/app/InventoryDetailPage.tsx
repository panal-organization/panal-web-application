import { Box, Typography } from "@mui/material"
import { Page } from "../../templates"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import DeleteArticuloModal from "../../components/inventory/DeleteArticuloModal"
// 🔥 COMPONENTES
import ArticuloCard from "../../components/inventory/ArticuloCard"
import CreateArticuloModal from "../../components/inventory/CreateArticuloModal"

// 🔥 ICONOS
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import WidgetsIcon from "@mui/icons-material/Widgets"
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone"
import LaptopMacIcon from "@mui/icons-material/LaptopMac"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import CategoryIcon from "@mui/icons-material/Category"
import ViewListIcon from "@mui/icons-material/ViewList"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"


import ArticuloDetailModal from "../../components/inventory/ArticuloDetailModal"

import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows"
import RouterIcon from "@mui/icons-material/Router"
import PrintIcon from "@mui/icons-material/Print"

import MemoryIcon from "@mui/icons-material/Memory"
import SettingsIcon from "@mui/icons-material/Settings"

import BuildIcon from "@mui/icons-material/Build"
import FactoryIcon from "@mui/icons-material/Factory"
import AppsIcon from "@mui/icons-material/Apps"
import ScienceIcon from "@mui/icons-material/Science"

// 🔥 estilos
import "./OrdersPage.css"
import "./TicketsPage.css"



/* =========================
ICONO DINÁMICO
========================= */
const iconMap: any = {
  widgets: <WidgetsIcon sx={{ fontSize: 20 }} />,
  inventory: <Inventory2Icon sx={{ fontSize: 20 }} />,
  category: <CategoryIcon sx={{ fontSize: 20 }} />,
  list: <ViewListIcon sx={{ fontSize: 20 }} />,
  truck: <LocalShippingIcon sx={{ fontSize: 20 }} />,

  laptop: <LaptopMacIcon sx={{ fontSize: 20 }} />,
  desktop: <DesktopWindowsIcon sx={{ fontSize: 20 }} />,
  router: <RouterIcon sx={{ fontSize: 20 }} />,
  mobile: <PhoneIphoneIcon sx={{ fontSize: 20 }} />,
  printer: <PrintIcon sx={{ fontSize: 20 }} />,

  chip: <MemoryIcon sx={{ fontSize: 20 }} />,
  settings: <SettingsIcon sx={{ fontSize: 20 }} />,

  tools: <BuildIcon sx={{ fontSize: 20 }} />,
  factory: <FactoryIcon sx={{ fontSize: 20 }} />,
  apps: <AppsIcon sx={{ fontSize: 20 }} />,
  lab: <ScienceIcon sx={{ fontSize: 20 }} />
}

const getIcon = (icono: string) => {
  return iconMap[icono] || <WidgetsIcon sx={{ fontSize: 20 }} />
}

const InventoryDetailPage: React.FC = () => {

  const { id } = useParams()
  const navigate = useNavigate()
    useEffect(() => {
    document.title = "Articulos"
  }, [])
const [isDeleteOpen, setIsDeleteOpen] = useState(false)
const [articuloToDelete, setArticuloToDelete] = useState<any>(null)
  const [articulos, setArticulos] = useState<any[]>([])
  const [almacenes, setAlmacenes] = useState<any[]>([])
  const [almacen, setAlmacen] = useState<any>(null)

  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
const [selectedArticulo, setSelectedArticulo] = useState<any>(null)
const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [articuloEdit, setArticuloEdit] = useState<any>(null)

  // 🔥 PAGINACIÓN
  const [page, setPage] = useState(1)
  const itemsPerPage = 4

  /* =========================
     FETCH DATA
  ========================= */
  const handleView = (articulo: any) => {
  setSelectedArticulo(articulo)
  setIsDetailOpen(true)
}
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

        setAlmacenes(almacenesLista)

        const filtrados = articulosLista.filter(
  (a: any) =>
    String(a.almacen_id) === String(id) &&
    a.estatus !== false
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

  useEffect(() => {
    setPage(1)
  }, [search])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const handleDeleteArticulo = async () => {
  if (!articuloToDelete) return

  try {
    await fetch(`/api/articulos/${articuloToDelete._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        estatus: false
      })
    })

    // 🔥 quitar de la UI
    setArticulos(prev =>
      prev.filter(a => String(a._id) !== String(articuloToDelete._id))
    )

    setIsDeleteOpen(false)
    setArticuloToDelete(null)

  } catch (error) {
    console.error("Error eliminando artículo:", error)
  }
}

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
              onClick={() => {
                setArticuloEdit(null)
                setOpenModal(true)
              }}
            >
              <AddIcon />
              Nuevo artículo
            </button>
          </Box>

        </div>

        {/* INFO ALMACÉN */}
        {almacen && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1, px: 1 }}>
            <Box sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              background: "#e0f2fe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {getIcon(almacen.icono)}
            </Box>

            <Typography fontSize="15px" fontWeight="600">
              {almacen.nombre}
            </Typography>
          </Box>
        )}

        {/* TOTAL */}
        <div className="tickets-total" style={{ margin: "20px 0", marginLeft: "10px" }}>
          Total de artículos: <strong>{filtered.length}</strong>
        </div>

        {/* LISTA */}
        <Box 
  className="tickets-container"
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 2.5 // 🔥 AQUÍ está la magia
  }}
>
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
  onView={handleView} // 🔥 ESTE FALTABA
  onEdit={(item: any) => {
    setArticuloEdit(item)
    setOpenModal(true)
  }}
  onDelete={(item: any) => {
    setArticuloToDelete(item)
    setIsDeleteOpen(true)
  }}
/>
            ))
          )}

        </Box>

        {/* PAGINACIÓN */}
        {totalPages >= 1 && (
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

        {/* 🔥 MODAL (CORREGIDO COMO TICKETS) */}
        <ArticuloDetailModal
  isOpen={isDetailOpen}
  onClose={() => setIsDetailOpen(false)}
  articulo={selectedArticulo}
/>
        <CreateArticuloModal
          isOpen={openModal}
          onClose={() => {
            setOpenModal(false)
            setArticuloEdit(null)
          }}
          articuloToEdit={articuloEdit}
          almacenes={almacenes}
onSuccess={(newArticulo: any) => {
  setArticulos(prev => {

    const exists = prev.find(a => String(a._id) === String(newArticulo._id))

    // 🔥 SI CAMBIÓ DE ALMACÉN → LO QUITAS
    if (exists && String(newArticulo.almacen_id) !== String(id)) {
      return prev.filter(a => String(a._id) !== String(newArticulo._id))
    }

    // 🔥 EDIT
    if (exists) {
      return prev.map(a =>
        String(a._id) === String(newArticulo._id)
          ? newArticulo
          : a
      )
    }

    // 🔥 CREATE
    return [newArticulo, ...prev]
  })
}}        />
<DeleteArticuloModal
  isOpen={isDeleteOpen}
  onClose={() => {
    setIsDeleteOpen(false)
    setArticuloToDelete(null)
  }}
  onConfirm={handleDeleteArticulo}
  articulo={articuloToDelete}
/>
      </Box>
    </Page>
  )
}

export default InventoryDetailPage