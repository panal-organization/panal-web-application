import { Box, Typography } from "@mui/material"
import WidgetsIcon from "@mui/icons-material/Widgets"
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone"
import LaptopMacIcon from "@mui/icons-material/LaptopMac"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

/* =========================
ICONO DINÁMICO
========================= */
const getIcon = (icono: string) => {
  switch (icono) {
    case "widgets":
      return <WidgetsIcon />
    case "mobile":
      return <PhoneIphoneIcon />
    case "laptop":
      return <LaptopMacIcon />
    default:
      return <WidgetsIcon />
  }
}

const AlmacenCard = ({ almacen, onClick }: any) => {

  return (
    <Box
      className="ticket-card"
      onClick={() => onClick(almacen)}
       sx={{
  display: "flex",
  gap: 2,
  p: 2,
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  background: "#fff",
  mb: 1.5,
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",

  // 🔥 LA MAGIA
  transition: "transform 0.2s ease, box-shadow 0.2s ease",

  "&:hover": {
    transform: "scale(1.01)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
  }
}}
    >

      {/* ICONO IZQUIERDA */}
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: "12px",
          background: "#e0f2fe",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}
      >
        {getIcon(almacen.icono)}
      </Box>

      {/* CONTENIDO */}
      <Box flex={1} ml={1}>

        <Typography fontWeight="bold">
          {almacen.nombre}
        </Typography>

        <Typography fontSize="13px" color="gray">
          {almacen.registros || 0} artículos
        </Typography>

      </Box>

      {/* FLECHA */}
      <ChevronRightIcon sx={{ color: "#9ca3af" }} />

    </Box>
  )
}

export default AlmacenCard