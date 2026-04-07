import "./DashboardCard.css"

interface Props {
  title: string
  icon?: React.ReactNode
  iconColor?: "orange" | "blue"
  children: React.ReactNode
}

const DashboardCard: React.FC<Props> = ({
  title,
  icon,
  iconColor = "orange",
  children
}) => {
  return (
    <div className="dashboard-card">

      {/* 🔥 ICONO FLOTANTE */}
      {icon && (
        <div className={`card-circle-icon2 ${iconColor}`}>
          {icon}
        </div>
      )}

      {/* HEADER */}
      <div className="dashboard-card-header">
        <h3>{title}</h3>
      </div>

      {/* CONTENIDO */}
      <div className="dashboard-card-content">
        {children}
      </div>

    </div>
  )
}

export default DashboardCard