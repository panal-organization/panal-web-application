import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

interface Workspace {
  _id: string
  nombre: string
  admin_id?: string
  tipo?: "personal" | "team"
  is_deleted?: boolean
}

interface WorkspaceContextType {
  workspace: Workspace | null
  setWorkspace: (workspace: Workspace) => void
  loading: boolean
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null)

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {

  const { user } = useAuth()

  const [workspace, setWorkspaceState] = useState<Workspace | null>(null)
  const [loading, setLoading] = useState(true)

  // 🔥 setter global
  const setWorkspace = (ws: Workspace) => {
    localStorage.setItem("workspace", JSON.stringify(ws))
    setWorkspaceState(ws)
  }

  // ===============================
  // 🔥 INIT (LOGIN / REFRESH)
  // ===============================
  useEffect(() => {

    const initWorkspace = async () => {

      if (!user?._id) return

      try {

        // 🔹 relaciones
        const relRes = await fetch(`/api/workspaces-usuarios`, {
         headers: {
  "Content-Type": "application/json"
}
        })

        const relaciones = await relRes.json()

        const misRelaciones = relaciones.filter(
          (r: any) => r.usuario_id === user._id
        )

        const workspaceIds = misRelaciones.map(
          (r: any) => r.workspace_id
        )

        // 🔹 workspaces
        const wsRes = await fetch(`/api/workspaces`, {
          headers: {
  "Content-Type": "application/json"
}
        })

        const allWorkspaces = await wsRes.json()

        // 🔥 FILTRO IMPORTANTE
        const misWorkspaces = allWorkspaces
          .filter((ws: any) => workspaceIds.includes(ws._id))
          .filter((ws: any) => !ws.is_deleted)

        console.log("✅ Workspaces válidos:", misWorkspaces)

        // ===============================
        // 🔥 VALIDAR LOCALSTORAGE
        // ===============================
        const savedWorkspace = localStorage.getItem("workspace")

        if (savedWorkspace) {
          const parsed = JSON.parse(savedWorkspace)

          const stillExists = misWorkspaces.find(
            (w: any) => String(w._id) === String(parsed._id)
          )

          if (stillExists) {
            console.log("✅ Workspace válido desde localStorage")
            setWorkspaceState(stillExists)
            setLoading(false)
            return
          }

          console.log("⚠️ Workspace eliminado o inválido, limpiando...")
          localStorage.removeItem("workspace")
        }

        // ===============================
        // 🔥 FALLBACK AUTOMÁTICO
        // ===============================
        if (misWorkspaces.length > 0) {

          const personal = misWorkspaces.find(
            (ws: any) => String(ws.admin_id) === String(user._id)
          )

          const seleccionado = personal || misWorkspaces[0]

          console.log("🎯 Workspace fallback:", seleccionado)

          setWorkspace(seleccionado)
        }

      } catch (err) {
        console.error("❌ Error inicializando workspace:", err)
      }

      setLoading(false)
    }

    initWorkspace()

  }, [user])

  // ===============================
  // 🔥 VALIDACIÓN CONTINUA (CLAVE)
  // ===============================
  useEffect(() => {

    if (!workspace) return

    const checkIfStillValid = async () => {

      try {
        const wsRes = await fetch(`/api/workspaces`, {
          headers: {
  "Content-Type": "application/json"
}
        })

        const allWorkspaces = await wsRes.json()

        const stillExists = allWorkspaces.find(
          (w: any) =>
            String(w._id) === String(workspace._id) &&
            !w.is_deleted
        )

        if (!stillExists) {
          console.log("🚨 Workspace actual eliminado → reseteando...")

          localStorage.removeItem("workspace")

          // 🔥 fuerza re-evaluación completa
          window.location.reload()
        }

      } catch (err) {
        console.error("Error validando workspace activo:", err)
      }
    }

    const interval = setInterval(checkIfStillValid, 5000)

    return () => clearInterval(interval)

  }, [workspace])

  return (
    <WorkspaceContext.Provider value={{ workspace, setWorkspace, loading }}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export const useWorkspace = () => {

  const context = useContext(WorkspaceContext)

  if (!context) {
    throw new Error("useWorkspace must be used inside WorkspaceProvider")
  }

  return context
}