import "../orders/CreateOrderModal.css"

import { Info, FileText, Tag, AlertTriangle, Upload } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useWorkspace } from "../../context/WorkspaceContext"

const CreateTicketModal = ({
  isOpen,
  onClose,
  onSuccess,
  ticketToEdit // 🔥 NUEVO
}: any) => {

  const { user } = useAuth()
  const { workspace } = useWorkspace()

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    prioridad: "MEDIA",
    categoria: "SOPORTE",
    estado: "PENDIENTE"
  })

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setForm({
      titulo: "",
      descripcion: "",
      prioridad: "MEDIA",
      categoria: "SOPORTE",
      estado: "PENDIENTE"
    })
    setFile(null)
    setPreview(null)
  }

  // 🔥 PRECARGAR DATOS (EDIT)
  useEffect(() => {
    if (ticketToEdit) {
      setForm({
        titulo: ticketToEdit.titulo || "",
        descripcion: ticketToEdit.descripcion || "",
        prioridad: ticketToEdit.prioridad || "MEDIA",
        categoria: ticketToEdit.categoria || "SOPORTE",
        estado: ticketToEdit.estado || "PENDIENTE"
      })

      if (ticketToEdit.foto) {
        setPreview(ticketToEdit.foto)
      }
    }
  }, [ticketToEdit])

  if (!isOpen) return null

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e: any) => {
    const selected = e.target.files[0]
    if (!selected) return

    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!workspace?._id) return

    try {
      setLoading(true)

      let imageUrl = preview

      // 🔥 SUBIR IMAGEN SI HAY NUEVA
      if (file && user?._id) {
        const fd = new FormData()
        fd.append("file", file)
        fd.append("usuario_id", user._id)
        fd.append("tipo", "documento")

        const res = await fetch("/api/upload", {
          method: "POST",
          body: fd
        })

        const data = await res.json()
        imageUrl = data?.archivo?.url || data?.url
      }

      const isEditing = !!ticketToEdit

      const res = await fetch(
        isEditing
          ? `/api/tickets/${ticketToEdit._id}`
          : "/api/tickets",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...form,
            foto: imageUrl,
            workspace_id: workspace._id,
            created_by: user?._id
          })
        }
      )

      const result = await res.json()

      if (onSuccess) onSuccess(result)

      resetForm()
      onClose()

    } catch (err) {
      console.error("❌ ERROR:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* IMAGE */}
        <label className="modal-image upload-zone">
          {preview ? (
            <img src={preview} />
          ) : (
            <div className="no-image">
              <Upload size={28} />
              <span>Subir imagen</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        {/* HEADER */}
        <div className="modal-header">
          <div>
            <h2>{ticketToEdit ? "Editar ticket" : "Crear ticket"}</h2>
            <p className="modal-subtitle">
              {ticketToEdit
                ? "Modifica la información del ticket"
                : "Completa la información del ticket"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="modal-grid">

            {/* TITULO */}
            <div className="modal-card">
              <div className="modal-card-header">
                <FileText size={16} />
                <span>Título</span>
              </div>
              <input
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                className="modal-input"
              />
            </div>

            {/* PRIORIDAD */}
            <div className="modal-card">
              <div className="modal-card-header">
                <AlertTriangle size={16} />
                <span>Prioridad</span>
              </div>
              <select
                name="prioridad"
                value={form.prioridad}
                onChange={handleChange}
              >
                <option value="BAJA">Baja (-)</option>
                <option value="MEDIA">Media (I)</option>
                <option value="ALTA">Alta (II)</option>
                <option value="CRITICA">Crítica (III)</option>
              </select>
            </div>

            {/* CATEGORIA */}
            <div className="modal-card">
              <div className="modal-card-header">
                <Tag size={16} />
                <span>Categoría</span>
              </div>
              <select
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
              >
                <option value="SOPORTE">Soporte</option>
                <option value="BUG">Bug</option>
                <option value="MEJORA">Mejora</option>
                <option value="MANTENIMIENTO">Mantenimiento</option>
              </select>
            </div>

            {/* ESTADO */}
            <div className="modal-card">
              <div className="modal-card-header">
                <Info size={16} />
                <span>Estado</span>
              </div>
              <select
                name="estado"
                value={form.estado}
                onChange={handleChange}
              >
                <option value="PENDIENTE">Pendiente</option>
                <option value="EN_PROGRESO">En progreso</option>
                <option value="RESUELTO">Resuelto</option>
              </select>
            </div>

          </div>

          {/* DESCRIPCIÓN */}
          <div className="modal-description full-width">
            <div className="modal-card-header">
              <FileText size={16} />
              <span>Descripción</span>
            </div>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
            />
          </div>

          {/* BOTONES */}
          <div className="modal-actions">
            <button
              type="button"
              onClick={() => {
                resetForm()
                onClose()
              }}
              className="btn-secondary"
            >
              Cancelar
            </button>

            <button type="submit" className="btn-primary">
              {loading
                ? (ticketToEdit ? "Actualizando..." : "Creando...")
                : (ticketToEdit ? "Actualizar ticket" : "Crear ticket")}
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default CreateTicketModal