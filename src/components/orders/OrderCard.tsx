
import { Box, Typography, IconButton } from "@mui/material"
import "./OrderCard.css"

import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

/* =========================
HELPERS
========================= */

const getEstadoClass = (estado: string) => {
  switch (estado) {
    case "PENDIENTE":
      return "badge pendiente"
    case "EN_PROGRESO":
      return "badge en_progreso"
    case "RESUELTO":
      return "badge resuelto"
    default:
      return "badge"
  }
}

const getEstadoIcon = (estado: string) => {
  switch (estado) {
    case "RESUELTO":
      return <CheckCircleIcon fontSize="small" />
    case "EN_PROGRESO":
      return <HourglassBottomIcon fontSize="small" />
    case "PENDIENTE":
      return <RadioButtonUncheckedIcon fontSize="small" />
    default:
      return null
  }
}

/* =========================
COMPONENTE
========================= */

const OrderCard = ({
  order,
  onView,
  onEdit,
  onDelete,
  getTipoNombre,
  getArticuloNombre
}: any) => {

  const hasImage = order.foto && order.foto.startsWith("http")

  return (
    <Box
      onClick={() => onView(order)}
      sx={{
        cursor: "pointer",
        display: "flex",
        gap: 2,
        p: 2,
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        background: "#fff",
        mb: 2,
        mt: -1.6,
        ml: 1,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
        }
      }}
    >

      {/* IMAGEN */}
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: "10px",
          overflow: "hidden",
          background: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}
      >
        {hasImage ? (
          <img
            src={order.foto}
            alt="orden"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        ) : (
          <ImageNotSupportedIcon sx={{ color: "#444", fontSize: 50 }} />
        )}
      </Box>

      {/* CONTENIDO */}
      <Box flex={1}>

        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>

          {/* IZQUIERDA */}
          <Typography fontWeight="bold">
            {order.descripcion}
          </Typography>

          {/* DERECHA */}
          <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>

            {/* ESTADO */}
            <div className={getEstadoClass(order.estado)}>
              {getEstadoIcon(order.estado)}
              <span>{order.estado}</span>
            </div>

          </Box>

        </Box>

        {/* SUBINFO */}
        <Typography fontSize="14px" color="gray" mb={1}>
          {getTipoNombre(order.tipo_id)}
        </Typography>

        {/* BADGES + ACCIONES */}
        <Box display="flex" alignItems="center" mt={2}>

          {/* IZQUIERDA */}
          <Box display="flex" gap={1}>
            <div className="badge categoria">
              {getArticuloNombre(order.articulo_id)}
            </div>
          </Box>

          {/* DERECHA */}
          <Box
            sx={{
              ml: "auto",
              display: "flex",
              gap: 1
            }}
          >
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(order)
              }}
              sx={{
                background: "#f3f4f6",
                "&:hover": { background: "#e5e7eb" }
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(order)
              }}
              sx={{
                background: "#f3f4f6",
                "&:hover": { background: "#e5e7eb" }
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>

        </Box>

      </Box>

    </Box>
  )
}

export default OrderCard
