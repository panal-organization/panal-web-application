import { useState, useEffect } from "react"

import { API_BASE_URL } from "../../config/api"
interface Props {
  isOpen: boolean
  onClose: () => void
  workspace: any
  onUpdated: (ws: any) => void
}

const EditWorkspaceModal = ({ isOpen, onClose, workspace, onUpdated }: Props) => {

  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  // 🔥 CARGAR DATOS + LIMPIAR
  useEffect(() => {
    if (isOpen && workspace) {
      setName(workspace.nombre || "")
      setMessage("")
    }
  }, [workspace, isOpen])

  if (!isOpen) return null

  const handleUpdate = async () => {

    // 🔥 VALIDACIÓN
    if (!name.trim()) {
      setMessage("Tu espacio de trabajo debe tener un nombre")
      return
    }

    try {
      setLoading(true)
      setMessage("Guardando cambios...")

      const res = await fetch(`${API_BASE_URL}/workspaces/${workspace._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: name
        })
      })

      if (!res.ok) throw new Error("Error actualizando")

      const updated = await res.json()

      // ⏳ Delay suave (UX como create)
      await new Promise(resolve => setTimeout(resolve, 800))

      // 🔥 ACTUALIZA LISTA
      onUpdated(updated)

      // 🔥 LIMPIA
      setMessage("")
      setName("")

      onClose()

    } catch (err) {
      console.error(err)
      setMessage("Error al actualizar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="workspace-modal-overlay">
      <div className="workspace-modal">

        {/* HEADER */}
        <div className="workspace-modal-header">
          <h3>Editar nombre del workspace</h3>
        </div>

        {/* BODY */}
        <div className="workspace-modal-body">
          <input
            type="text"
            className="workspace-input"
            placeholder="Nombre del workspace"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setMessage("") // 🔥 limpia error al escribir
            }}
          />

          {/* 🔥 MENSAJE DINÁMICO */}
          <div
            style={{
              fontSize: "13px",
              marginTop: "13px",
              minHeight: "18px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color:
                message.includes("Error") || message.includes("debe")
                  ? "#e53935"
                  : "#666"
            }}
          >
            {loading && <span className="spinner"></span>}
            {message}
          </div>
        </div>

        {/* BOTONES */}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>

          <button
            className="workspace-btn secondary"
            onClick={() => {
              setMessage("")
              setName("")
              onClose()
            }}
          >
            Cancelar
          </button>

          <button
            className="workspace-btn primary"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>

        </div>

      </div>
    </div>
  )
}

export default EditWorkspaceModal