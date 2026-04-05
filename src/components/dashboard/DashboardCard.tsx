
import "./DashboardCard.css"

interface Props {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}

const DashboardCard: React.FC<Props> = ({ title, icon, children }) => {
  return (
    <div className="dashboard-card">
      
      <div className="dashboard-card-header">
        {icon && <span className="dashboard-card-icon">{icon}</span>}
        <h3>{title}</h3>
      </div>

      <div className="dashboard-card-content">
        {children}
      </div>

    </div>
  )
}

export default DashboardCard