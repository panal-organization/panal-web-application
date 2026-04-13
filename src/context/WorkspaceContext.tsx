import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"

interface Workspace {
  _id: string
  nombre: string
  admin_id?: string
  is_deleted?: boolean
}

interface WorkspaceContextType {
  workspace: Workspace | null
  setWorkspace: (workspace: Workspace) => void
  loading: boolean
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null)

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {

  const { user, token } = useAuth()

  const [workspace, setWorkspaceState] = useState<Workspace | null>(null)
  const [loading, setLoading] = useState(true)

  // 🔥 SOLO CAMBIA UI (NO BACKEND)
  const setWorkspace = (ws: Workspace) => {
    localStorage.setItem("workspace", JSON.stringify(ws))
    setWorkspaceState(ws)
  }

  useEffect(() => {

    const initWorkspace = async () => {

      if (!user?._id || !token) {
        setLoading(false)
        return
      }

      try {

        const headers = {
          Authorization: token.startsWith("Bearer ")
            ? token
            : `Bearer ${token}`,
        }

        // 🔹 relaciones
        const relRes = await fetch(`/api/workspaces-usuarios`, { headers })
        const relaciones = await relRes.json()

        const misRelaciones = relaciones.filter(
          (r: any) => r.usuario_id === user._id
        )

        const workspaceIds = misRelaciones.map(
          (r: any) => r.workspace_id
        )

        // 🔹 workspaces
        const wsRes = await fetch(`/api/workspaces`, { headers })
        const allWorkspaces = await wsRes.json()

        const misWorkspaces = allWorkspaces
          .filter((ws: any) => workspaceIds.includes(ws._id))
          .filter((ws: any) => !ws.is_deleted)

        console.log("✅ Workspaces válidos:", misWorkspaces)

        // 🔹 LOCALSTORAGE
        const saved = localStorage.getItem("workspace")

        if (saved) {
          const parsed = JSON.parse(saved)

          const stillExists = misWorkspaces.find(
            (w: any) => String(w._id) === String(parsed._id)
          )

          if (stillExists) {
            console.log("✅ Workspace desde localStorage")
            setWorkspaceState(stillExists)
            setLoading(false)
            return
          }

          console.log("⚠️ Workspace inválido, limpiando...")
          localStorage.removeItem("workspace")
        }

        // 🔹 FALLBACK (solo UI)
        if (misWorkspaces.length > 0) {

          const personal = misWorkspaces.find(
            (ws: any) => String(ws.admin_id) === String(user._id)
          )

          const seleccionado = personal || misWorkspaces[0]

          console.log("🎯 Workspace fallback:", seleccionado)

          setWorkspaceState(seleccionado)
        }

      } catch (err) {
        console.error("❌ Error cargando workspace:", err)
      }

      setLoading(false)
    }

    initWorkspace()

  }, [user, token])

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