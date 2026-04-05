import { useEffect, useState } from "react"
import { useWorkspace } from "../../context/WorkspaceContext"

const MembersWorkspaceModal = ({ isOpen, onClose }: any) => {

  const { workspace } = useWorkspace()

  const [usuarios, setUsuarios] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // 🔥 FETCH MIEMBROS
  useEffect(() => {

    if (!isOpen || !workspace?._id) return

    const fetchUsuarios = async () => {

      try {

        setLoading(true)

        const relRes = await fetch(`/api/workspaces-usuarios`, {
          headers: {
  "Content-Type": "application/json"
}
        })

        const relaciones = await relRes.json()

        const usersRes = await fetch(`/api/usuarios`, {
        headers: {
  "Content-Type": "application/json"
}
        })

        const usuariosData = await usersRes.json()

        // 🔥 filtrar relaciones del workspace actual
        const relacionesWorkspace = relaciones.filter(
          (r: any) =>
            String(r.workspace_id) === String(workspace._id)
        )

        // 🔥 ids de usuarios
        const userIds = relacionesWorkspace.map(
          (r: any) => String(r.usuario_id)
        )

        // 🔥 cruzar con usuarios
        const miembros = usuariosData.filter(
          (u: any) => userIds.includes(String(u._id))
        )

        setUsuarios(miembros)

      } catch (err) {
        console.error("Error cargando miembros:", err)
      } finally {
        setLoading(false)
      }

    }

    fetchUsuarios()

  }, [isOpen, workspace])

  // 🔥 limpiar al cerrar
  useEffect(() => {
    if (!isOpen) {
      setUsuarios([])
    }
  }, [isOpen])

  if (!isOpen) return null

  // 🔥 ordenar: admin primero
  const sortedUsuarios = [...usuarios].sort((a, b) => {
    if (String(a._id) === String(workspace?.admin_id)) return -1
    if (String(b._id) === String(workspace?.admin_id)) return 1
    return 0
  })

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="modal-header">
          <div>
            <h2>Miembros del workspace</h2>
            <p className="modal-subtitle">
              {workspace?.nombre}
            </p>
          </div>
        </div>

        {/* BODY */}
        <div style={{
          marginTop: 15,
          maxHeight: "350px",
          overflowY: "auto",
            paddingLeft: "10px",
  paddingRight: "10px"
        }}>

          {loading && (
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
    fontSize: 14,
    color: "#666"
  }}>
    Cargando miembros...
  </div>
)}

          {!loading && sortedUsuarios.length === 0 && (
            <p style={{ fontSize: 14 }}>No hay miembros</p>
          )}

          {!loading && sortedUsuarios.map((u) => {

            const isAdmin = String(u._id) === String(workspace?.admin_id)

            return (
              <div
                key={u._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  borderRadius: "14px",
                  background: "#f8fafc",
                  marginBottom: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                }}
              >

                {/* 👤 AVATAR */}
                <div
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "#e3f2fd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: 14
                  }}
                >
                  {u.foto ? (
                    <img 
                      src={u.foto} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    u.nombre?.charAt(0)
                  )}
                </div>

                {/* 📄 INFO */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>
                    {u.nombre}
                  </div>

                  <div style={{ fontSize: 12, color: "#666" }}>
                    {u.correo}
                  </div>

                  {/* 🏷️ ADMIN */}
                  {isAdmin && (
                    <div style={{
                      marginTop: 4,
                      display: "inline-block",
                      fontSize: 11,
                      background: "#e3f2fd",
                      color: "#1976d2",
                      padding: "2px 8px",
                      borderRadius: "10px"
                    }}>
                      Administrador / Dueño
                    </div>
                  )}
                </div>

                {/* ⭐ ESTRELLA */}
                {isAdmin && (
                  <div style={{ color: "#1976d2", fontSize: 18 }}>
                    ★
                  </div>
                )}

              </div>
            )
          })}

        </div>

        {/* FOOTER */}
        <div className="modal-actions">
          <button 
            onClick={onClose}
            className="btn-secondary"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  )
}

export default MembersWorkspaceModal