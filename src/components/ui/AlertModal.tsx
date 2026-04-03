

interface Props {
  isOpen: boolean
  message: string
  onClose: () => void
}

const AlertModal = ({ isOpen, message, onClose }: Props) => {

  if (!isOpen) return null

  return (
    <div className="workspace-modal-overlay">
      <div className="workspace-modal" style={{ width: 420 }}>

        {/* HEADER */}
        <div className="workspace-modal-header">
          <h3>Acción no permitida</h3>
        </div>

        {/* BODY */}
        <div className="workspace-modal-body">
          <p style={{ fontSize: 14, color: "#444" }}>
            {message}
          </p>
        </div>

        {/* BOTÓN */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <button
            className="workspace-btn primary"
            onClick={onClose}
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  )
}

export default AlertModal