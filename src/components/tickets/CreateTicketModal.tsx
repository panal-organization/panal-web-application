import "../orders/CreateOrderModal.css"

import { Info, FileText, Tag, AlertTriangle, Upload } from "lucide-react"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useWorkspace } from "../../context/WorkspaceContext"

const CreateTicketModal = ({
  isOpen,
  onClose,
  onSuccess
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

    console.log("📸 FILE SELECTED:", selected)

    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!workspace?._id) return

    try {
      setLoading(true)

      let imageUrl: string | null = null

      // 🔥 SUBIR IMAGEN
      if (file && user?._id) {
        console.log("🚀 Subiendo imagen...")

        const fd = new FormData()
        fd.append("file", file)
        fd.append("usuario_id", user._id)
        fd.append("tipo", "documento")

        const res = await fetch("/api/upload", {
          method: "POST",
          body: fd
        })

        const data = await res.json()

        console.log("📦 RESPUESTA UPLOAD:", data)

        imageUrl = data?.archivo?.url || data?.url || null
      }

      console.log("🧠 URL FINAL:", imageUrl)

      // 🔥 CREAR TICKET
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          foto: imageUrl, // 🔥 CLAVE
          workspace_id: workspace._id,
          created_by: user?._id
        })
      })

      const result = await res.json()

      console.log("✅ TICKET CREADO:", result)

      onSuccess(result)

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
            <h2>Crear ticket</h2>
            <p className="modal-subtitle">
              Completa la información del ticket
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
              <select disabled>
                <option>Pendiente</option>
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
              {loading ? "Creando..." : "Crear ticket"}
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default CreateTicketModal