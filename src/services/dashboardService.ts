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

// 🔥 Helper para ordenar por fecha (reutilizable)
const sortByDateDesc = (arr: any[]) => {
  return arr.sort(
    (a, b) =>
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime()
  )
}

// 🔥 Obtener último item por workspace (FIX)
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

  const ordenados = sortByDateDesc(filtrados)

  return ordenados[0] // ✅ el más reciente real
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

  const ordenados = sortByDateDesc(filtrados)

  return ordenados[0] // ✅ ahora sí el último real
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

  const almacenIds = almacenesFiltrados.map((a: any) =>
    String(a._id)
  )

  // 🔹 artículos ligados a esos almacenes
  const articulosFiltrados = articulos.filter((art: any) =>
    almacenIds.includes(String(art.almacen_id))
  )

  if (articulosFiltrados.length === 0) return null

  const ordenados = sortByDateDesc(articulosFiltrados)

  return ordenados[0] // ✅ correcto
}

// 🔥 MANTENIMIENTO
export const getMaintenanceStatus = async (workspaceId?: string) => {
  const ordenes = await fetchData(`${API_BASE_URL}/ordenes-servicio`)

  if (!Array.isArray(ordenes)) return null

  const ID_MANTENIMIENTO = "69bf750fa60f4c167e8586b8"

  // 🔹 filtrar por workspace
  const filtrados = ordenes.filter((item: any) =>
    item.workspace_id &&
    String(item.workspace_id) === String(workspaceId)
  )

  if (filtrados.length === 0) return null

  // 🔹 filtrar solo mantenimiento
  const maintenance = filtrados.filter((item: any) =>
    String(item.tipo_id) === ID_MANTENIMIENTO
  )

  if (maintenance.length === 0) return null

  const ordenados = sortByDateDesc(maintenance)

  // 🔥 prioridad: pendientes primero
  const pending = ordenados.find((item: any) =>
    item.estado?.toLowerCase() !== "resuelto"
  )

  return pending || ordenados[0]
}