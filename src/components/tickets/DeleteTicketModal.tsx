import "../orders/CreateOrderModal.css"

import { AlertTriangle } from "lucide-react"
import { useState } from "react"

const DeleteTicketModal = ({
  isOpen,
  onClose,
  onConfirm,
  ticket
}: any) => {

  const [text, setText] = useState("")

  if (!isOpen || !ticket) return null

  return (
    <div className="delete-modal-overlay">

      <div className="delete-modal">

        <h3 className="delete-title">
          <AlertTriangle size={20} className="delete-icon" />
          Eliminar ticket
        </h3>

        <p>¿Seguro que quieres eliminar este ticket?</p>

        <div className="delete-order-box">
          {ticket.titulo}
        </div>

        <div className="delete-warning">
          Este ticket dejará de ser visible para otros usuarios.
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

          <button
            className="btn-secondary"
            onClick={onClose}
          >
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

export default DeleteTicketModal