import { useState } from "react"
import { useWorkspace } from "../../context/WorkspaceContext"
import { API_BASE_URL } from "../../config/api"


interface Props {
  isOpen: boolean
  onClose: () => void
  user: any
  onCreated: (workspace: any) => void // 🔥 CORREGIDO
}

const CreateWorkspaceModal = ({ isOpen, onClose, user, onCreated }: Props) => {

  const { setWorkspace } = useWorkspace()

  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  if (!isOpen) return null

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8)
  }

  const handleCreate = async () => {

    if (!name.trim()) {
      setMessage("Ingresa un nombre")
      return
    }

    try {
      setLoading(true)
      setMessage("Creando espacio...")

      const codigo = generateCode()

      // 🔥 CREAR WORKSPACE
      const res = await fetch(`${API_BASE_URL}/workspaces`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: name,
          codigo,
          admin_id: user._id
        })
      })

      if (!res.ok) throw new Error("Error creando workspace")

      const newWorkspace = await res.json()

      // 🔥 CREAR RELACIÓN
      const relRes = await fetch(`${API_BASE_URL}/workspaces-usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          workspace_id: newWorkspace._id,
          usuario_id: user._id
        })
      })

      if (!relRes.ok) throw new Error("Error creando relación")

      // 🔥 GUARDAR EN CONTEXTO
      setWorkspace(newWorkspace)
      localStorage.setItem("workspace", JSON.stringify(newWorkspace))

      // ⏳ Delay suave (mejor UX)
      await new Promise(resolve => setTimeout(resolve, 1200))

      // 🔥 ACTUALIZAR LISTA
      onCreated(newWorkspace)

      // 🔥 LIMPIAR
      setName("")
      setMessage("")

      onClose()

    } catch (err) {
      console.error(err)
      setMessage("Error al crear el workspace")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="workspace-modal-overlay">
      <div className="workspace-modal">

        {/* HEADER */}
        <div className="workspace-modal-header">
          <h3>Crear espacio</h3>
        </div>

        {/* BODY */}
        <div className="workspace-modal-body">
          <input
            type="text"
            placeholder="Nombre del workspace"
            className="workspace-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setMessage("")
            }}
          />

          <div
            style={{
              fontSize: "13px",
              marginTop: "13px",
              minHeight: "18px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#666"
            }}
          >
            {loading && <span className="spinner"></span>}
            {message}
          </div>
        </div>

        {/* BOTONES */}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>

          <button
            onClick={() => {
              setName("")
              setMessage("")
              onClose()
            }}
            className="workspace-close-btn flex-fix"
          >
            Cancelar
          </button>

          <button
            onClick={handleCreate}
            disabled={loading}
            className="workspace-btn primary"
          >
            {loading ? "Creando..." : "Crear"}
          </button>

        </div>

      </div>
    </div>
  )
}

export default CreateWorkspaceModal