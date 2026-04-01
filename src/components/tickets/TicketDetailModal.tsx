import "../orders/OrderDetailModal.css"
import {
  Calendar,
  ImageOff,
  AlertTriangle,
  Tag,
  FileText,
  RefreshCw,
  User
} from "lucide-react"


const formatText = (text: string = "") => {
  const map: any = {
    SOPORTE: "Soporte",
    BUG: "Bug",
    MEJORA: "Mejora",
    MANTENIMIENTO: "Mantenimiento",
    BAJA: "Baja",
    MEDIA: "Media",
    ALTA: "Alta",
    CRITICA: "Crítica"
  }

  return map[text] || text
}
const TicketDetailModal = ({ isOpen, onClose, ticket }: any) => {
  if (!isOpen || !ticket) return null

  const fechaCreacion = new Date(ticket.created_at)
  const fechaUpdate = ticket.updated_at
    ? new Date(ticket.updated_at)
    : null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* 🖼️ IMAGEN */}
        <div className="modal-image">
          {ticket.foto && ticket.foto.startsWith("http") ? (
            <img src={ticket.foto} alt="ticket" />
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
            <h2>{ticket.titulo}</h2>
            <p className="modal-subtitle">
              #{ticket._id.slice(-4)}
            </p>
          </div>

          <span className={`badge ${ticket.estado.toLowerCase()}`}>
            {ticket.estado}
          </span>
        </div>

        {/* INFO */}
        <div className="modal-grid">

          {/* 👤 CREADO POR */}
          <div className="modal-card">
            <div className="modal-card-header">
              <User size={16} />
              <span>Creado por</span>
            </div>
            <p>{ticket.usuario_nombre || "Usuario"}</p>
          </div>

          {/* 🔥 PRIORIDAD */}
          <div className="modal-card">
            <div className="modal-card-header">
              <AlertTriangle size={16} />
              <span>Prioridad</span>
            </div>
            <p>{formatText(ticket.prioridad)}</p>
          </div>

          {/* 🏷️ CATEGORÍA */}
          <div className="modal-card">
            <div className="modal-card-header">
              <Tag size={16} />
              <span>Categoría</span>
            </div>
            <p>{formatText(ticket.categoria || "SOPORTE")}</p>
          </div>

          {/* 📅 CREADO */}
          <div className="modal-card">
            <div className="modal-card-header">
              <Calendar size={16} />
              <span>Creado el</span>
            </div>
            <p>{fechaCreacion.toLocaleString()}</p>
          </div>

          {/* 🔄 ACTUALIZADO */}
          <div className="modal-card">
            <div className="modal-card-header">
              <RefreshCw size={16} />
              <span>Última actualización</span>
            </div>
            <p>
              {fechaUpdate
                ? fechaUpdate.toLocaleString()
                : "Sin cambios"}
            </p>
          </div>

        </div>

        {/* 📝 DESCRIPCIÓN */}
        <div className="modal-description">
          <div className="modal-card-header">
            <FileText size={16} />
            <span>Descripción</span>
          </div>
          <p>{ticket.descripcion}</p>
        </div>

      </div>
    </div>
  )
}

export default TicketDetailModal