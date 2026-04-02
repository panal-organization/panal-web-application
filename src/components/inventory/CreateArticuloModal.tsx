import "../orders/CreateOrderModal.css"

import { FileText, Tag, Upload } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useWorkspace } from "../../context/WorkspaceContext"

const CreateArticuloModal = ({
  isOpen,
  onClose,
  onSuccess,
  articuloToEdit,
  almacenes = []
}: any) => {

  const { user } = useAuth()
  const { workspace } = useWorkspace()

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    almacen_id: "",
    unidad: "unidad"
  })

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  /* =========================
     RESET
  ========================= */
  const resetForm = () => {
    setForm({
      nombre: "",
      descripcion: "",
      almacen_id: "",
      unidad: "unidad"
    })
    setFile(null)
    setPreview(null)
  }

  /* =========================
     PRECARGAR (EDIT)
  ========================= */
  useEffect(() => {
    if (articuloToEdit) {
      setForm({
        nombre: articuloToEdit.nombre || "",
        descripcion: articuloToEdit.descripcion || "",
        almacen_id: articuloToEdit.almacen_id || "",
        unidad: articuloToEdit.unidad || "unidad"
      })

      setPreview(articuloToEdit.foto || null)
      setFile(null) // 🔥 importante
    }
  }, [articuloToEdit])

  if (!isOpen) return null

  /* =========================
     HANDLERS
  ========================= */
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

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!workspace?._id) return

    try {
      setLoading(true)

      let imageUrl = preview

      // 🔥 SUBIR IMAGEN SOLO SI CAMBIÓ
      if (file) {
        const fd = new FormData()
        fd.append("file", file)
        fd.append("usuario_id", user?._id || "")
        fd.append("tipo", "documento")

        const resUpload = await fetch("/api/upload", {
          method: "POST",
          body: fd
        })

        const data = await resUpload.json()
        imageUrl = data?.archivo?.url || data?.url
      }

      const isEditing = !!articuloToEdit

      const res = await fetch(
        isEditing
          ? `/api/articulos/${articuloToEdit._id}`
          : "/api/articulos",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...form,
            foto: imageUrl,
            workspace_id: workspace._id
          })
        }
      )

      const result = await res.json()

      // 🔥 ESTO EVITA RECARGA
      if (onSuccess) onSuccess(result)

      resetForm()
      onClose()

    } catch (err) {
      console.error("❌ ERROR:", err)
    } finally {
      setLoading(false)
    }
  }

  /* =========================
     UI
  ========================= */
  return (
    <div className="modal-backdrop">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* 🖼️ IMAGEN */}
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
            <h2>{articuloToEdit ? "Editar artículo" : "Crear artículo"}</h2>
            <p className="modal-subtitle">
              {articuloToEdit
                ? "Modifica la información del artículo"
                : "Completa la información del artículo"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="modal-grid">

            {/* NOMBRE */}
            <div className="modal-card">
              <div className="modal-card-header">
                <FileText size={16} />
                <span>Nombre</span>
              </div>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="modal-input"
              />
            </div>

            {/* ALMACÉN */}
            <div className="modal-card">
              <div className="modal-card-header">
                <Tag size={16} />
                <span>Almacén</span>
              </div>
              <select
                name="almacen_id"
                value={form.almacen_id}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                {almacenes.map((a: any) => (
                  <option key={a._id} value={a._id}>
                    {a.nombre}
                  </option>
                ))}
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
                ? (articuloToEdit ? "Actualizando..." : "Creando...")
                : (articuloToEdit ? "Actualizar artículo" : "Crear artículo")}
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default CreateArticuloModal