import { Box, IconButton } from "@mui/material"
import { useAuth } from "../../context/AuthContext"

// 🔥 ICONOS MUI
import PersonIcon from "@mui/icons-material/Person"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import VpnKeyIcon from "@mui/icons-material/VpnKey"
import GroupsIcon from "@mui/icons-material/Groups"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

interface Props {
  workspace: any 
  isActive: boolean
  onClick: () => void
  onEdit: (ws: any) => void
  onDelete: (ws: any) => void
  canEdit: boolean // 👈 IMPORTANTE
}

const WorkCard: React.FC<Props> = ({
  workspace,
  isActive,
  onClick,
  onEdit,
  onDelete,
  canEdit
}) => {

  const { user } = useAuth()

  const isPersonal = workspace.admin_id === user?._id

  return (
    <Box
      className="workspace-card"
      onClick={onClick}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        mb: 2,
        borderRadius: 3,
        cursor: "pointer",
        background: isActive ? "#e3f2fd" : "#fff",
        border: isActive
          ? "2px solid #1976d2"
          : "1px solid #e0e0e0",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
        }
      }}
    >

      {/* 🔥 BOTONES SOLO SI ES ADMIN */}
      {canEdit && (
        <Box
          sx={{
            position: "absolute",
            top: 14,
            right: 14,
            display: "flex",
            gap: 1
          }}
        >
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(workspace)
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
              onDelete(workspace)
            }}
            sx={{
              background: "#f3f4f6",
              "&:hover": { background: "#e5e7eb" }
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* IZQUIERDA */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

        {/* ICONO */}
        <div className="workspace-icon">
          {isPersonal ? (
            <PersonIcon fontSize="small" />
          ) : (
            <BusinessCenterIcon fontSize="small" />
          )}
        </div>

        {/* INFO */}
        <div>

          <div className="workspace-title">
            {workspace.nombre}
          </div>

          {/* CODIGO */}
          <div
            className="workspace-code"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <VpnKeyIcon style={{ fontSize: 14 }} />
            Código: {workspace.codigo || "----"}
          </div>

          {/* BADGE */}
          <div
            className={`workspace-badge ${
              isPersonal ? "personal" : "team"
            }`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              width: "fit-content"
            }}
          >
            {isPersonal ? (
              <>
                <PersonIcon style={{ fontSize: 12 }} />
                Personal
              </>
            ) : (
              <>
                <GroupsIcon style={{ fontSize: 12 }} />
                Equipo
              </>
            )}
          </div>

        </div>

      </div>

    </Box>
  )
}

export default WorkCard