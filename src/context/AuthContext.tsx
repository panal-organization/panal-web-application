import { createContext, useContext, useEffect, useState } from "react"

interface User {
  _id: string
  correo: string
  plan_id?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  updateToken: (token: string) => void // ✅ AGREGADO
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // 🔥 CARGAR DESDE LOCALSTORAGE
  useEffect(() => {

    const savedToken = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")

    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }

    setLoading(false)

  }, [])

  // 🔥 TRAER USER COMPLETO (CON plan_id)
  useEffect(() => {

    const fetchUserWithPlan = async () => {

      if (!user?._id) return

      if (user.plan_id) return

      try {
        const res = await fetch(`/api/usuarios/${user._id}`, {
          headers: {
            "Content-Type": "application/json"
          }
        })

        const fullUser = await res.json()

        setUser(fullUser)
        localStorage.setItem("user", JSON.stringify(fullUser))

      } catch (err) {
        console.error(err)
      }
    }

    fetchUserWithPlan()

  }, [user?._id])

  const login = (token: string, user: User) => {

    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))

    setToken(token)
    setUser(user)
  }

  // ✅ AQUÍ VA (DENTRO DEL COMPONENTE)
  const updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)
  }

  const logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("workspace")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateToken, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {

  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return context
}