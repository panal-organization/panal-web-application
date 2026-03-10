import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {

  const { token, loading } = useAuth()

  if (loading) {
    return null
  }

  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}