import "../orders/CreateOrderModal.css"
import { AlertTriangle } from "lucide-react"
import { useState } from "react"

const DeleteArticuloModal = ({
  isOpen,
  onClose,
  onConfirm,
  articulo
}: any) => {

  const [text, setText] = useState("")

  if (!isOpen || !articulo) return null

  return (
    <div className="delete-modal-overlay">

      <div className="delete-modal">

        <h3 className="delete-title">
          <AlertTriangle size={20} className="delete-icon" />
          Eliminar artículo
        </h3>

        <p>¿Seguro que quieres eliminar este artículo?</p>

        <div className="delete-order-box">
          {articulo.nombre}
        </div>

        <div className="delete-warning">
          Este artículo dejará de ser visible.
          Esta acción no se puede deshacer.
        </div>

        <p>Escribe <strong>ELIMINAR</strong> para confirmar:</p>

        <input
          className="delete-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ELIMINAR"
        />

        <div className="modal-actions">

          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>

          <button
            className="btn-primary delete"
            disabled={text !== "ELIMINAR"}
            onClick={() => {
              onConfirm()
              setText("")
            }}
          >
            Eliminar
          </button>

        </div>

      </div>

    </div>
  )
}

export default DeleteArticuloModal