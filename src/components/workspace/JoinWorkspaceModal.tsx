import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useWorkspace } from "../../context/WorkspaceContext"

// 🔥 AJUSTA TU URL AQUÍ
const BASE_URL = "https://waggish-unsecludedly-jong.ngrok-free.dev/api"

interface Props {
  isOpen: boolean
  onClose: () => void
  user: any
  onJoined: () => void
}

const JoinWorkspaceModal = ({ isOpen, onClose, user, onJoined }: Props) => {

  const navigate = useNavigate()
  const { setWorkspace } = useWorkspace()
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"error" | "info" | "loading">("info")

  useEffect(() => {
    if (isOpen) {
      setMessage("")
      setCode("")
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleJoin = async () => {

    if (!code.trim()) {
      setMessage("Ingresa un código")
      setMessageType("error")
      return
    }

    try {
      setLoading(true)

      setMessage("Uniéndose al workspace...")
      setMessageType("loading")

      // 🔥 FETCH WORKSPACES
      const res = await fetch(`${BASE_URL}/workspaces`, {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      })

      if (!res.ok) throw new Error("Error en API workspaces")

      const workspaces = await res.json()

      const found = workspaces.find((ws: any) => ws.codigo === code)
      

      if (!found) {
        setMessage("Código inválido")
        setMessageType("error")
        return
      }

      
if (found.nombre === "Espacio Personal") {
  setMessage("Este espacio es personal y no admite invitados")
  setMessageType("error")
  return
}
      // 🔥 FETCH RELACIONES
      const relRes = await fetch(`${BASE_URL}/workspaces-usuarios`, {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      })

      if (!relRes.ok) throw new Error("Error en relaciones")

      const relaciones = await relRes.json()

      const yaExiste = relaciones.some(
        (r: any) =>
          r.workspace_id === found._id &&
          r.usuario_id === user._id
      )

      if (yaExiste) {
        setMessage("Ya perteneces a este workspace")
        setMessageType("error")
        return
      }

      // 🔥 CREAR RELACIÓN
      const createRes = await fetch(`${BASE_URL}/workspaces-usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({
          workspace_id: found._id,
          usuario_id: user._id
        })
      })

      if (!createRes.ok) throw new Error("Error creando relación")

      // 🔥 CONTEXT + STORAGE
      setWorkspace(found)
      localStorage.setItem("workspace", JSON.stringify(found))

      onJoined()
  

await sleep(2000) // puedes probar 1000–1500
      onClose()
console.log("REDIRIGIENDO A DASHBOARD")

      navigate("/dashboard")

    } catch (err) {
      console.error("JOIN ERROR:", err)
      setMessage("Error al unirse (revisa conexión o ngrok)")
      setMessageType("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="workspace-modal-overlay">
      <div className="workspace-modal">

        <div className="workspace-modal-header">
          <h3>Unirse a un espacio por invitación</h3>
        </div>

        <div className="workspace-modal-body">
          <input
            type="text"
            placeholder="Código del workspace"
            className="workspace-input"
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
              setMessage("")
            }}
          />

          <div
            style={{
              fontSize: "13px",
              marginTop: "13px",
              minHeight: "18px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: messageType === "error" ? "#e53935" : "#666"
            }}
          >
            {messageType === "loading" && (
              <span className="spinner"></span>
            )}
            {message}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>

          <button
            onClick={() => {
              setMessage("")
              setCode("")
              onClose()
            }}
            className="workspace-close-btn flex-fix"
          >
            Cancelar
          </button>

          <button
            onClick={handleJoin}
            disabled={loading}
            className="workspace-btn primary"
          >
            {loading ? "Uniéndose..." : "Unirse"}
          </button>

        </div>

      </div>
    </div>
  )
}

export default JoinWorkspaceModal