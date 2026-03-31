import { createContext, useContext, useEffect, useState } from "react"

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

  const [workspace, setWorkspaceState] = useState<Workspace | null>(null)
  const [loading, setLoading] = useState(true)

  // 🔥 cargar desde localStorage
  useEffect(() => {

    const savedWorkspace = localStorage.getItem("workspace")

    if (savedWorkspace) {
      setWorkspaceState(JSON.parse(savedWorkspace))
    }

    setLoading(false)

  }, [])

  const setWorkspace = (workspace: Workspace) => {

    localStorage.setItem("workspace", JSON.stringify(workspace))
    setWorkspaceState(workspace)
  }

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
