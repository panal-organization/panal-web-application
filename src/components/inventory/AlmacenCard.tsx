import { Box, Typography, IconButton } from "@mui/material"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

// 🔥 ICONOS
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import WidgetsIcon from "@mui/icons-material/Widgets"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import CategoryIcon from "@mui/icons-material/Category"
import ViewListIcon from "@mui/icons-material/ViewList"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"

import LaptopMacIcon from "@mui/icons-material/LaptopMac"
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows"
import RouterIcon from "@mui/icons-material/Router"
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone"
import PrintIcon from "@mui/icons-material/Print"

import MemoryIcon from "@mui/icons-material/Memory"
import SettingsIcon from "@mui/icons-material/Settings"

import BuildIcon from "@mui/icons-material/Build"
import FactoryIcon from "@mui/icons-material/Factory"
import AppsIcon from "@mui/icons-material/Apps"
import ScienceIcon from "@mui/icons-material/Science"

/* =========================
ICON MAP
========================= */
const iconMap: any = {
  widgets: <WidgetsIcon />,
  inventory: <Inventory2Icon />,
  category: <CategoryIcon />,
  list: <ViewListIcon />,
  truck: <LocalShippingIcon />,

  laptop: <LaptopMacIcon />,
  desktop: <DesktopWindowsIcon />,
  router: <RouterIcon />,
  mobile: <PhoneIphoneIcon />,
  printer: <PrintIcon />,

  chip: <MemoryIcon />,
  settings: <SettingsIcon />,

  tools: <BuildIcon />,
  factory: <FactoryIcon />,
  apps: <AppsIcon />,
  lab: <ScienceIcon />
}

const getIcon = (icono: string) => {
  return iconMap[icono] || <WidgetsIcon />
}

/* =========================
COMPONENTE
========================= */
const AlmacenCard = ({ almacen, onClick, onEdit, onDelete }: any) => {

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
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
        }
      }}
    >

      {/* ICONO */}
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

      {/* 🔥 ACCIONES + FLECHA */}
      <Box display="flex" alignItems="center" gap={1}>

        {/* EDIT */}
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            onEdit && onEdit(almacen)
          }}
          sx={{
            background: "#f3f4f6",
            "&:hover": {
              background: "#e5e7eb"
            }
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>

        {/* DELETE */}
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            onDelete && onDelete(almacen)
          }}
          sx={{
            background: "#f3f4f6",
            "&:hover": {
              background: "#e5e7eb"
            }
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>

        {/* FLECHA */}
        <ChevronRightIcon sx={{ color: "#9ca3af" }} />

      </Box>

    </Box>
  )
}

export default AlmacenCard