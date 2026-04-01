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
import { useWorkspace } from "../../context/WorkspaceContext"

const CreateOrderModal = ({
  isOpen,
  onClose,
  tipos,
  articulos,
  onSuccess,
  orderToEdit // 🔥 NUEVO
}: any) => {

  const { user } = useAuth()
  const { workspace } = useWorkspace()

  const [almacenesData, setAlmacenesData] = useState<any[]>([])

  const [form, setForm] = useState({
    descripcion: "",
    tipo_id: "",
    articulo_id: "",
    almacen_id: "",
    estado: "PENDIENTE"
  })

  const resetForm = () => {
  setForm({
    descripcion: "",
    tipo_id: "",
    articulo_id: "",
    almacen_id: "",
    estado: "PENDIENTE"
  })

  setPreview(null)
  setFile(null)
  setErrors({})
}
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})

  //NO BORRRAR ERRORS AUNQUE NO SE USE!!!
  //NO BORRAR SI NO NO SE ACTUALIZA EN ORDERS!!!!!
  //PLZ !
  
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
        console.log(errors)
      }
    }

    if (isOpen) fetchAlmacenes()
  }, [isOpen])

  // 🔥 PRECARGAR DATOS (EDIT)
  useEffect(() => {
  if (orderToEdit) {

    const articuloSeleccionado = articulos.find(
      (a: any) => String(a._id) === String(orderToEdit.articulo_id)
    )

    let almacenId = ""

    if (articuloSeleccionado) {
      almacenId =
        typeof articuloSeleccionado.almacen_id === "object"
          ? articuloSeleccionado.almacen_id._id
          : articuloSeleccionado.almacen_id
    }

    setForm({
      descripcion: orderToEdit.descripcion || "",
      tipo_id: orderToEdit.tipo_id || "",
      articulo_id: orderToEdit.articulo_id || "",
      almacen_id: almacenId, // 🔥 AHORA VIENE DEL ARTICULO
      estado: orderToEdit.estado || "PENDIENTE"
    })

    if (orderToEdit.foto) {
      setPreview(orderToEdit.foto)
    }
  }
}, [orderToEdit, articulos])

  if (!isOpen) return null

  const handleChange = (e: any) => {

  // 🔥 SI CAMBIA ARTICULO → AUTO SET ALMACEN
  if (e.target.name === "articulo_id") {

    const articuloSeleccionado = articulos.find(
      (a: any) => String(a._id) === String(e.target.value)
    )

    if (articuloSeleccionado) {

      const almacenId =
        typeof articuloSeleccionado.almacen_id === "object"
          ? articuloSeleccionado.almacen_id._id
          : articuloSeleccionado.almacen_id

      setForm({
        ...form,
        articulo_id: e.target.value,
        almacen_id: almacenId // 🔥 AUTO
      })

      return
    }
  }

  // 🔁 comportamiento normal
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

    if (!workspace?._id) {
      console.error("❌ No hay workspace activo")
      return
    }

    if (!validate()) return

    try {
      setLoading(true)

      let imageUrl = preview

      // subir imagen si hay nueva
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

      const isEditing = !!orderToEdit

      const res = await fetch(
        isEditing
          ? `/api/ordenes-servicio/${orderToEdit._id}`
          : "/api/ordenes-servicio",
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

resetForm()   // 🔥 limpia todo
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
          <input type="file" onChange={handleImageChange} />
        </label>

        {/* HEADER */}
        <div className="modal-header">
          <div>
            <h2>{orderToEdit ? "Editar orden" : "Crear orden"}</h2>
            <p className="modal-subtitle">
              {orderToEdit
                ? "Modifica la información de la orden"
                : "Completa la información de la orden"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="modal-grid">

            {/* ALMACEN */}
            <div className="modal-card">
              <div className="modal-card-header">
                <Warehouse size={16} />
                <span>Almacén</span>
              </div>
              <select
                name="almacen_id"
                value={form.almacen_id}
                onChange={handleChange}
                disabled
              >
                <option value="">Seleccionar almacén</option>
                {almacenesData.map((a: any) => (
                  <option key={a._id} value={a._id}>
                    {a.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* ARTICULO */}
            <div className="modal-card">
              <div className="modal-card-header">
                <Package size={16} />
                <span>Artículo</span>
              </div>
              <select
                name="articulo_id"
                value={form.articulo_id}
                onChange={handleChange}
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
                ? (orderToEdit ? "Actualizando..." : "Creando...")
                : (orderToEdit ? "Actualizar orden" : "Crear orden")}
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}


export default CreateOrderModal