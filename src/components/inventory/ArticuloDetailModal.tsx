import "../orders/CreateOrderModal.css"

import {
  FileText,
  Calendar,
  Clock,
  CheckCircle
} from "lucide-react"

const ArticuloDetailModal = ({ isOpen, onClose, articulo }: any) => {
  if (!isOpen || !articulo) return null

  const hasImage = articulo.foto && articulo.foto.startsWith("http")

  const created = new Date(articulo.createdAt)
  const updated = new Date(articulo.updatedAt)

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* 🖼️ IMAGEN */}
        <div className="modal-image">
          {hasImage ? (
            <img src={articulo.foto} alt="articulo" />
          ) : (
            <div className="no-image">
              <span>Sin imagen</span>
            </div>
          )}
        </div>

        {/* HEADER */}
        <div className="modal-header">
          <div>
            <h2>{articulo.nombre}</h2>
            <div className="modal-subtitle">
              Detalle del artículo
            </div>
          </div>
        </div>

        {/* 🔥 INFO GRID (simplificado) */}
        <div className="modal-grid">

          <div className="modal-card">
            <div className="modal-card-header">
              <CheckCircle size={16} />
              <span>Estatus</span>
            </div>
            <p>{articulo.estatus ? "Activo" : "Inactivo"}</p>
          </div>

          <div className="modal-card">
            <div className="modal-card-header">
              <Calendar size={16} />
              <span>Creado</span>
            </div>
            <p>{created.toLocaleDateString()}</p>
          </div>

          <div className="modal-card">
            <div className="modal-card-header">
              <Clock size={16} />
              <span>Hora</span>
            </div>
            <p>{created.toLocaleTimeString()}</p>
          </div>

          <div className="modal-card">
            <div className="modal-card-header">
              <Calendar size={16} />
              <span>Actualizado</span>
            </div>
            <p>{updated.toLocaleDateString()}</p>
          </div>

        </div>

        {/* 📝 DESCRIPCIÓN */}
        <div className="modal-description">
          <div className="modal-card-header">
            <FileText size={16} />
            <span>Descripción</span>
          </div>

          <p>{articulo.descripcion || "Sin descripción"}</p>
        </div>

        {/* BOTÓN */}
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>

      </div>
    </div>
  )
}

export default ArticuloDetailModal