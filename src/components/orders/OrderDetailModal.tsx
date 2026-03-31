import "./OrderDetailModal.css"
import {
  User,
  Folder,
  Package,
  Calendar,
  Clock,
  ImageOff
} from "lucide-react"

const OrderDetailModal = ({
  isOpen,
  onClose,
  order,
  getTipoNombre,
  getArticuloNombre
}: any) => {

  if (!isOpen || !order) return null

  const fecha = new Date(order.created_at)

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* 🖼️ IMAGEN HERO */}
        <div className="modal-image">
          {order.foto && order.foto.startsWith("http") ? (
            <img src={order.foto} alt="evidencia" />
          ) : (
            <div className="no-image">
              <ImageOff size={32} />
              <span>Sin imagen</span>
            </div>
          )}
        </div>

        {/* HEADER */}
        <div className="modal-header">
          <div>
            <h2>{getTipoNombre(order.tipo_id)}</h2>
            <p className="modal-subtitle">
              {getArticuloNombre(order.articulo_id)}
            </p>
          </div>

          <span className={`badge ${order.estado.toLowerCase()}`}>
            {order.estado}
          </span>
        </div>

        {/* INFO GRID */}
        <div className="modal-grid">

          <div className="modal-card">
            <div className="modal-card-header">
              <User size={16} />
              <span>Creado por</span>
            </div>
            <p>{order.usuario_nombre}</p>
          </div>

          <div className="modal-card">
            <div className="modal-card-header">
              <Folder size={16} />
              <span>Tipo</span>
            </div>
            <p>{getTipoNombre(order.tipo_id)}</p>
          </div>

          <div className="modal-card">
            <div className="modal-card-header">
              <Package size={16} />
              <span>Artículo</span>
            </div>
            <p>{getArticuloNombre(order.articulo_id)}</p>
          </div>

          <div className="modal-card">
            <div className="modal-card-header">
              <Calendar size={16} />
              <span>Fecha</span>
            </div>
            <p>{fecha.toLocaleDateString()}</p>
          </div>

          <div className="modal-card">
            <div className="modal-card-header">
              <Clock size={16} />
              <span>Hora</span>
            </div>
            <p>{fecha.toLocaleTimeString()}</p>
          </div>

        </div>

        {/* DESCRIPCIÓN */}
        <div className="modal-description">
          <div className="modal-card-header">
            <span>Descripción</span>
          </div>
          <p>{order.descripcion}</p>
        </div>

      </div>
    </div>
  )
}

export default OrderDetailModal