import "./CreateOrderModal.css"
import {
  FileText,
  Folder,
  Package,
  Info,
  Warehouse,
  Upload
} from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useWorkspace } from "../../context/WorkspaceContext" // 🔥 NUEVO

const CreateOrderModal = ({
  isOpen,
  onClose,
  tipos,
  articulos,
  onSuccess
}: any) => {

  const { user } = useAuth()
  const { workspace } = useWorkspace() // 🔥 CLAVE

  const [almacenesData, setAlmacenesData] = useState<any[]>([])

  const [form, setForm] = useState({
    descripcion: "",
    tipo_id: "",
    articulo_id: "",
    almacen_id: "",
    estado: "PENDIENTE"
  })

  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})

  // ✅ FETCH ALMACENES
  useEffect(() => {
    const fetchAlmacenes = async () => {
      try {
        const res = await fetch("/api/almacen", {
          headers: { "ngrok-skip-browser-warning": "true" }
        })

        const data = await res.json()
        setAlmacenesData(data.data || data.almacenes || data)

      } catch (err) {
        console.error("Error cargando almacenes", err)
      }
    }

    if (isOpen) fetchAlmacenes()
  }, [isOpen])

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

  const validate = () => {
    const newErrors: any = {}

    if (!form.descripcion) newErrors.descripcion = "Requerido"
    if (!form.tipo_id) newErrors.tipo_id = "Requerido"
    if (!form.articulo_id) newErrors.articulo_id = "Requerido"
    if (!form.almacen_id) newErrors.almacen_id = "Requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // 🔥 VALIDACIÓN CRÍTICA SaaS
    if (!workspace?._id) {
      console.error("❌ No hay workspace activo")
      return
    }

    if (!validate()) return

    try {
      setLoading(true)

      let imageUrl = null

      // 📸 SUBIR IMAGEN
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

      // 🔥 CREAR ORDEN (YA MULTI-TENANT)
      const res = await fetch("/api/ordenes-servicio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          foto: imageUrl,
          workspace_id: workspace._id,   // 🔥 CLAVE
          created_by: user?._id          // 🔥 RECOMENDADO
        })
      })

      const newOrder = await res.json()

      // 🔥 ACTUALIZAR UI INMEDIATAMENTE
      if (onSuccess) onSuccess(newOrder)

      onClose()

    } catch (err) {
      console.error("❌ ERROR CREANDO ORDEN:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
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
          <input type="file" onChange={handleImageChange} />
        </label>

        {/* HEADER */}
        <div className="modal-header">
          <div>
            <h2>Crear orden</h2>
            <p className="modal-subtitle">
              Completa la información de la orden
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="modal-grid">

            {/* ALMACÉN */}
            <div className="modal-card">
              <div className="modal-card-header">
                <Warehouse size={16} />
                <span>Almacén</span>
              </div>
              <select
                name="almacen_id"
                value={form.almacen_id}
                onChange={handleChange}
                className={errors.almacen_id ? "input-error" : ""}
              >
                <option value="">Seleccionar almacén</option>
                {almacenesData.map((a: any) => (
                  <option key={a._id} value={a._id}>
                    {a.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* ARTÍCULO */}
            <div className="modal-card">
              <div className="modal-card-header">
                <Package size={16} />
                <span>Artículo</span>
              </div>
              <select
                name="articulo_id"
                value={form.articulo_id}
                onChange={handleChange}
                className={errors.articulo_id ? "input-error" : ""}
              >
                <option value="">Seleccionar artículo</option>
                {articulos.map((a: any) => (
                  <option key={a._id} value={a._id}>
                    {a.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* TIPO */}
            <div className="modal-card">
              <div className="modal-card-header">
                <Folder size={16} />
                <span>Tipo</span>
              </div>
              <select
                name="tipo_id"
                value={form.tipo_id}
                onChange={handleChange}
                className={errors.tipo_id ? "input-error" : ""}
              >
                <option value="">Seleccionar tipo</option>
                {tipos.map((t: any) => (
                  <option key={t._id} value={t._id}>
                    {t.nombre}
                  </option>
                ))}
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
              placeholder="Describe los detalles de la orden..."
              value={form.descripcion}
              onChange={handleChange}
              className={errors.descripcion ? "input-error" : ""}
            />
          </div>

          {/* BOTONES */}
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancelar
            </button>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Creando..." : "Crear orden"}
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default CreateOrderModal