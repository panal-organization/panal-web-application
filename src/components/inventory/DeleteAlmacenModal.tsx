import "../orders/CreateOrderModal.css"
import { AlertTriangle } from "lucide-react"
import { useState } from "react"

const DeleteAlmacenModal = ({
  isOpen,
  onClose,
  onConfirm,
  almacen
}: any) => {

  const [text, setText] = useState("")

  if (!isOpen || !almacen) return null

  return (
    <div className="delete-modal-overlay">

      <div className="delete-modal">

        <h3 className="delete-title">
          <AlertTriangle size={20} className="delete-icon" />
          Eliminar almacén
        </h3>

        <p>¿Seguro que quieres eliminar este almacén?</p>

        <div className="delete-order-box">
          {almacen.nombre}
        </div>

        <div className="delete-warning">
          Este almacén dejará existir para ti y otros usuarios de este espacio de trabajo.
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

export default DeleteAlmacenModal