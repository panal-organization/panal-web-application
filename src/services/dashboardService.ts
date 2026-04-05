import { API_BASE_URL } from "../config/api"

// 🔥 Obtener último registro de cualquier endpoint
export const getLastItem = async (endpoint: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`)

    if (!res.ok) {
      throw new Error("Error en la petición")
    }

    const data = await res.json()

    if (!Array.isArray(data) || data.length === 0) {
      return null
    }

    // 🔥 si vienen ordenados → tomamos el último
    return data[data.length - 1]

  } catch (error) {
    console.error(`Error en ${endpoint}:`, error)
    return null
  }
}