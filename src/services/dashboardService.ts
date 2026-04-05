import { API_BASE_URL } from "../config/api"

// 🔹 Helper base
const fetchData = async (endpoint: string) => {
  try {
    const res = await fetch(endpoint)

    if (!res.ok) {
      throw new Error(`Error en ${endpoint}`)
    }

    return await res.json()
  } catch (error) {
    console.error("❌ Error:", error)
    return null
  }
}

// 🔥 Obtener último item por workspace
export const getLastItem = async (
  endpoint: string,
  workspaceId?: string
) => {
  const data = await fetchData(`${API_BASE_URL}/${endpoint}`)

  if (!Array.isArray(data)) return null

  const filtrados = data.filter((item: any) =>
    item.workspace_id &&
    String(item.workspace_id) === String(workspaceId)
  )

  if (filtrados.length === 0) return null

  return filtrados[filtrados.length - 1]
}

// 🔥 ÚLTIMO ALMACÉN (FIX REAL)
export const getLastWarehouse = async (workspaceId?: string) => {
  const almacenes = await fetchData(`${API_BASE_URL}/almacen`)

  if (!Array.isArray(almacenes)) return null

  const filtrados = almacenes.filter((a: any) =>
    a.workspace_id &&
    String(a.workspace_id) === String(workspaceId)
  )

  if (filtrados.length === 0) return null

  return filtrados[filtrados.length - 1]
}

// 🔥 ÚLTIMO ARTÍCULO (RELACIONADO A ALMACÉN)
export const getLastArticle = async (workspaceId?: string) => {
  const [articulos, almacenes] = await Promise.all([
    fetchData(`${API_BASE_URL}/articulos`),
    fetchData(`${API_BASE_URL}/almacen`)
  ])

  if (!Array.isArray(articulos) || !Array.isArray(almacenes)) return null

  // 🔹 almacenes del workspace
  const almacenesFiltrados = almacenes.filter((a: any) =>
    a.workspace_id &&
    String(a.workspace_id) === String(workspaceId)
  )

  const almacenIds = almacenesFiltrados.map((a: any) => String(a._id))

  // 🔹 artículos ligados a esos almacenes
  const articulosFiltrados = articulos.filter((art: any) =>
    almacenIds.includes(String(art.almacen_id))
  )

  if (articulosFiltrados.length === 0) return null

  return articulosFiltrados[articulosFiltrados.length - 1]
}

// 🔥 MANTENIMIENTO
export const getMaintenanceStatus = async (workspaceId?: string) => {
  const ordenes = await fetchData(`${API_BASE_URL}/ordenes-servicio`)

  if (!Array.isArray(ordenes)) return null

  // 🔹 ID REAL de mantenimiento (🔥 CAMBIA SI ES NECESARIO)
  const ID_MANTENIMIENTO = "69bf750fa60f4c167e8586b8"

  // 🔹 filtrar por workspace
  const filtrados = ordenes.filter((item: any) =>
    item.workspace_id &&
    String(item.workspace_id) === String(workspaceId)
  )

  if (filtrados.length === 0) return null

  // 🔥 filtrar por tipo REAL
  const maintenance = filtrados.filter((item: any) =>
    String(item.tipo_id) === ID_MANTENIMIENTO
  )

  if (maintenance.length === 0) return null

  // 🔹 prioridad: pendientes
  const pending = maintenance.find((item: any) =>
    item.estado?.toLowerCase() !== "resuelto"
  )

  return pending || maintenance[maintenance.length - 1]
}