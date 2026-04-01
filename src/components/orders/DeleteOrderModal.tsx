import "./DeleteOrderModal.css"
import "./CreateOrderModal.css"
import { AlertTriangle } from "lucide-react"


import { useState} from "react"

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  order: any
}

const DeleteOrderModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  order
}) => {

  const [text, setText] = useState("")

  if (!isOpen || !order) return null

 return (
  <div className="delete-modal-overlay">

    <div className="delete-modal">

   <h3 className="delete-title">
  <AlertTriangle size={20} className="delete-icon" />
  Eliminar orden
</h3>

      <p>¿Seguro que quieres eliminar esta orden?</p>

      <div className="delete-order-box">
        {order.descripcion}
      </div>

      <div className="delete-warning">
        Estás a punto de eliminar esta orden del workspace compartido.
Otros usuarios dejarán de verla.

Esta acción no se puede deshacer.
      </div>

      <p>Escribe <strong>ELIMINAR</strong> para confirmar:</p>
      <p></p>

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

export default DeleteOrderModal