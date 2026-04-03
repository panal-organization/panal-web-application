import "../orders/DeleteOrderModal.css"
import "../orders/CreateOrderModal.css"

import { AlertTriangle } from "lucide-react"
import { useState } from "react"

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void> | void
  workspace: any
}

const DeleteWorkspaceModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  workspace
}) => {

  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  if (!isOpen || !workspace) return null

  const handleDelete = async () => {
    try {
      setLoading(true)

      await onConfirm()
await new Promise(resolve => setTimeout(resolve, 1800))

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      setText("")
    }
  }

  return (
    <div className="delete-modal-overlay">

      <div className="delete-modal">

        {/* HEADER */}
        <h3 className="delete-title">
          <AlertTriangle size={20} className="delete-icon" />
          Eliminar workspace
        </h3>

        <p>¿Seguro que quieres eliminar este espacio de trabajo?</p>

        {/* NOMBRE */}
        <div className="delete-order-box">
          {workspace.nombre}
        </div>

        {/* WARNING */}
        <div className="delete-warning">
          Este workspace dejará de ser visible para todos los usuarios.
          <br />
          Esta acción no se puede deshacer.
        </div>

        {/* CONFIRMACIÓN */}
        <p>Escribe <strong>ELIMINAR</strong> para confirmar:</p>

        <input
          className="delete-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ELIMINAR"
          disabled={loading}
        />

        {/* 🔥 MENSAJE CON SPINNER */}
        <div
          style={{
            fontSize: "13px",
            marginTop: "10px",
            minHeight: "18px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#666"
          }}
        >
          {loading && <span className="spinner"></span>}
          {loading && "Eliminando..."}
        </div>

        {/* BOTONES */}
        <div className="modal-actions">

          <button
            className="btn-secondary"
            onClick={() => {
              setText("")
              onClose()
            }}
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            className="btn-primary delete"
            disabled={text !== "ELIMINAR" || loading}
            onClick={handleDelete}
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>

        </div>

      </div>

    </div>
  )
}

export default DeleteWorkspaceModal