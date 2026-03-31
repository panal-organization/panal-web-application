import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext" // 🔥 AJUSTA RUTA SI ES NECESARIO

interface Workspace {
  _id: string
  nombre: string
  tipo?: "personal" | "team"
}

interface WorkspaceContextType {
  workspace: Workspace | null
  setWorkspace: (workspace: Workspace) => void
  loading: boolean
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null)

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {

  const { user } = useAuth() // 🔥 FALTABA ESTO

  const [workspace, setWorkspaceState] = useState<Workspace | null>(null)
  const [loading, setLoading] = useState(true)

  // 🔥 función pública
  const setWorkspace = (workspace: Workspace) => {
    localStorage.setItem("workspace", JSON.stringify(workspace))
    setWorkspaceState(workspace)
  }

  useEffect(() => {

    const initWorkspace = async () => {

      // 🔥 1. localStorage
      const savedWorkspace = localStorage.getItem("workspace")

      if (savedWorkspace && user?._id) {
  const parsed = JSON.parse(savedWorkspace)

  // 🔥 validar que pertenece al usuario
  const relRes = await fetch(`/api/workspaces-usuarios`, {
    headers: { "ngrok-skip-browser-warning": "true" }
  })

  const relaciones = await relRes.json()

  const misRelaciones = relaciones.filter(
    (r: any) => r.usuario_id === user._id
  )

  const workspaceIds = misRelaciones.map(
    (r: any) => r.workspace_id
  )

  if (workspaceIds.includes(parsed._id)) {
    console.log("✅ Workspace válido desde localStorage:", parsed)
    setWorkspaceState(parsed)
    setLoading(false)
    return
  } else {
    console.log("⚠️ Workspace inválido, limpiando localStorage")
    localStorage.removeItem("workspace")
  }
}

      // 🔥 2. esperar usuario
      if (!user?._id) {
        return
      }

      try {

        console.log("🌍 Buscando workspace automáticamente...")

        // 🔹 relaciones
        const relRes = await fetch(`/api/workspaces-usuarios`, {
          headers: { "ngrok-skip-browser-warning": "true" }
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
          headers: { "ngrok-skip-browser-warning": "true" }
        })

        const allWorkspaces = await wsRes.json()

        const misWorkspaces = allWorkspaces.filter((ws: any) =>
          workspaceIds.includes(ws._id)
        )

        console.log("✅ Workspaces encontrados:", misWorkspaces)

        if (misWorkspaces.length > 0) {

          const personal = misWorkspaces.find(
            (ws: any) => ws.tipo === "personal"
          )

          const seleccionado = personal || misWorkspaces[0]

          console.log("🎯 Workspace auto-seleccionado:", seleccionado)

          setWorkspace(seleccionado)
        }

      } catch (err) {
        console.error("❌ Error auto workspace:", err)
      }

      setLoading(false)
    }

    initWorkspace()

  }, [user])

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