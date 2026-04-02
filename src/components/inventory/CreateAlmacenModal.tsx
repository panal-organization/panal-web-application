import "../orders/CreateOrderModal.css"
import { useState, useEffect } from "react"
import { useWorkspace } from "../../context/WorkspaceContext"

// 🔥 ICONOS (los tuyos)
import WidgetsIcon from "@mui/icons-material/Widgets"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import CategoryIcon from "@mui/icons-material/Category"
import ViewListIcon from "@mui/icons-material/ViewList"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import { FileText, Tag } from "lucide-react"
import LaptopMacIcon from "@mui/icons-material/LaptopMac"
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows"
import RouterIcon from "@mui/icons-material/Router"
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone"
import PrintIcon from "@mui/icons-material/Print"

import MemoryIcon from "@mui/icons-material/Memory"
import SettingsIcon from "@mui/icons-material/Settings"

import BuildIcon from "@mui/icons-material/Build"
import FactoryIcon from "@mui/icons-material/Factory"
import AppsIcon from "@mui/icons-material/Apps"
import ScienceIcon from "@mui/icons-material/Science"

/* =========================
ICON OPTIONS (🔥 TODOS)
========================= */
const iconOptions = [
  { value: "widgets", icon: <WidgetsIcon /> },
  { value: "inventory", icon: <Inventory2Icon /> },
  { value: "category", icon: <CategoryIcon /> },
  { value: "list", icon: <ViewListIcon /> },
  { value: "truck", icon: <LocalShippingIcon /> },

  { value: "laptop", icon: <LaptopMacIcon /> },
  { value: "desktop", icon: <DesktopWindowsIcon /> },
  { value: "router", icon: <RouterIcon /> },
  { value: "mobile", icon: <PhoneIphoneIcon /> },
  { value: "printer", icon: <PrintIcon /> },

  { value: "chip", icon: <MemoryIcon /> },
  { value: "settings", icon: <SettingsIcon /> },

  { value: "tools", icon: <BuildIcon /> },
  { value: "factory", icon: <FactoryIcon /> },
  { value: "apps", icon: <AppsIcon /> },
  { value: "lab", icon: <ScienceIcon /> }
]

/* =========================
COMPONENTE
========================= */
const CreateAlmacenModal = ({
  isOpen,
  onClose,
  onSuccess,
  almacenToEdit // 🔥 NUEVO
}: any) => {

  const { workspace } = useWorkspace()

  const [nombre, setNombre] = useState("")
  const [icono, setIcono] = useState("widgets")
  const [loading, setLoading] = useState(false)

  const isEdit = !!almacenToEdit // 🔥 DETECTA EDIT

  /* =========================
     PRECARGAR DATOS (EDIT)
  ========================= */
  useEffect(() => {
    if (almacenToEdit) {
      setNombre(almacenToEdit.nombre)
      setIcono(almacenToEdit.icono)
    }
  }, [almacenToEdit])

  if (!isOpen) return null

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!workspace?._id) return

    if (!nombre.trim()) {
      alert("El nombre del almacén es obligatorio")
      return
    }

    try {
      setLoading(true)

      const res = await fetch(
        isEdit
          ? `/api/almacen/${almacenToEdit._id}`
          : "/api/almacen",
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nombre,
            icono,
            workspace_id: workspace._id
          })
        }
      )

      const result = await res.json()
      const data = result.data || result

      if (onSuccess) onSuccess(data)

      // reset
      setNombre("")
      setIcono("widgets")

      onClose()

    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
<div className="modal-backdrop">
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>

    {/* HEADER BONITO */}
    <div className="modal-header">
      <div>
        <h2>{isEdit ? "Editar almacén" : "Crear almacén"}</h2>
        <p className="modal-subtitle">
          {isEdit
            ? "Modifica la información del almacén"
            : "Completa la información del almacén"}
        </p>
      </div>
    </div>

    <form onSubmit={handleSubmit}>

      <div className="modal-grid">

        {/* NOMBRE */}
        <div className="modal-card">
          <div className="modal-card-header">
            <FileText size={16} />
            <span>Nombre</span>
          </div>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="modal-input"
            placeholder="Ej: Consumibles"
          />
        </div>

        {/* ICONOS */}
        <div className="modal-card">
          <div className="modal-card-header">
             <Tag size={16} />
            <span>Icono</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
              marginTop: "10px"
            }}
          >
            {iconOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setIcono(opt.value)}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  border:
                    icono === opt.value
                      ? "2px solid #1976d2"
                      : "1px solid #ddd",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
              >
                {opt.icon}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* BOTONES */}
      <div className="modal-actions">
        <button
          type="button"
          onClick={onClose}
          className="btn-secondary"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
        >
          {loading
            ? (isEdit ? "Actualizando..." : "Creando...")
            : (isEdit ? "Actualizar" : "Crear")}
        </button>
      </div>

    </form>

  </div>
</div>  )
}

export default CreateAlmacenModal