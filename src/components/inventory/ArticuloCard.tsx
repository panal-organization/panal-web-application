import { Box, Typography, IconButton } from "@mui/material"
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

const ArticuloCard = ({ item, onView, onEdit, onDelete }: any) => {

  const hasImage = item.foto && item.foto.startsWith("http")

  return (
    <Box
      className="ticket-card"
       onClick={() => onView?.(item)} // 🔥 ESTO ES TODO
      sx={{
        cursor: "pointer",
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
            src={item.foto}
            alt="articulo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        ) : (
          <ImageNotSupportedIcon sx={{ fontSize: 40 }} />
        )}
      </Box>

      {/* CONTENIDO */}
      <Box flex={1}>

        <Box display="flex" justifyContent="space-between">

          <Typography fontWeight="bold">
            {item.nombre}
          </Typography>

          {/* ACCIONES */}
          <Box display="flex" gap={1}>

            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                onEdit?.(item)
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
                onDelete?.(item)
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

        <Typography fontSize="14px" color="gray" mb={1}>
          {item.descripcion || "Sin descripción"}
        </Typography>

        <Box mt={1} fontSize="12px" color="#6b7280">
       
        </Box>

      </Box>

    </Box>
  )
}

export default ArticuloCard