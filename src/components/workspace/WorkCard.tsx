import { Box } from "@mui/material"
import { useAuth } from "../../context/AuthContext"

// 🔥 ICONOS MUI
import PersonIcon from "@mui/icons-material/Person"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import VpnKeyIcon from "@mui/icons-material/VpnKey"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import GroupsIcon from "@mui/icons-material/Groups"

interface Props {
  workspace: any
  isActive: boolean
  onClick: () => void
}

const WorkCard: React.FC<Props> = ({
  workspace,
  isActive,
  onClick
}) => {

  const { user } = useAuth()

  const isPersonal = workspace.admin_id === user?._id

  return (
    <Box
      className="workspace-card"
      onClick={onClick}
      sx={{
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
        transition: "0.2s"
      }}
    >

      {/* IZQUIERDA */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

        {/* ICONO GRANDE */}
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

      {/* DERECHA */}
      <div className="workspace-arrow">
        <ChevronRightIcon />
      </div>

    </Box>
  )
}

export default WorkCard