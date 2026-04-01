import { Box, Typography } from "@mui/material"

// 🔥 reutilizamos estilos de Orders
import "../../pages/app/OrdersPage.css"

// 🔥 ICONOS
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported"


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

const normalize = (text: string = "") =>
  text.toLowerCase().replace(/\s+/g, "_").replace("/", "")

const getPrioridadClass = (prioridad: string) =>
  `badge prioridad ${prioridad?.toLowerCase()}`

const getCategoriaClass = (categoria?: string) =>
  `badge categoria ${normalize(categoria || "soporte")}`

/* =========================
COMPONENTE
========================= */

const TicketCard = ({ ticket, onClick }: any) => {

  const hasImage = ticket.foto && ticket.foto.startsWith("http")

  return (
    <Box
      onClick={() => onClick(ticket)} // 🔥 CLAVE
      sx={{
        cursor: "pointer",            // 🔥 UX PRO
        display: "flex",
        gap: 2,
        p: 2,
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        background: "#fff",
        mb: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        transition: "all 0.2s ease"
      }}
    >

      {/* 🖼️ IMAGEN */}
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
            src={ticket.foto}
            alt="ticket"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        ) : (
          <ImageNotSupportedIcon sx={{ color: "#444444", fontSize: 50 }} />
        )}
      </Box>

      {/* 📄 CONTENIDO */}
      <Box flex={1}>

        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography fontWeight="bold"mb={1.52}>
            {ticket.titulo}
          </Typography>

          <div className={getEstadoClass(ticket.estado)}>
            {getEstadoIcon(ticket.estado)}
            <span>{ticket.estado}</span>
          </div>
        </Box>

        {/* TITULO */}
        <Typography fontWeight="600" mb={4}>
          
        </Typography>

        {/* DESCRIPCIÓN */}
        <Typography fontSize="14px" color="gray" mb={1}>
          {ticket.descripcion}
        </Typography>

        {/* BADGES */}
        <Box
          display="flex"
          gap={1}
          alignItems="center"
          flexWrap="wrap"
          mt={1}
        >

          <div className={getPrioridadClass(ticket.prioridad)}>
            {ticket.prioridad}
          </div>

          <div className={getCategoriaClass(ticket.categoria)}>
            {ticket.categoria || "SOPORTE"}
          </div>

        </Box>

      </Box>

    </Box>
  )
}

export default TicketCard