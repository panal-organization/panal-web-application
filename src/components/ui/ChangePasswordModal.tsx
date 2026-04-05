import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import "./ChangePasswordModal.css"

const BASE_URL = "/api"

interface Props {
  isOpen: boolean
  onClose: () => void
  user: any
}

const ChangePasswordModal = ({ isOpen, onClose, user }: Props) => {

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  if (!isOpen) return null

  const handleSubmit = async () => {

    if (!newPassword || !confirmPassword) {
      setMessage("Completa todos los campos")
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden")
      return
    }

    try {
      setLoading(true)
      setMessage("Actualizando contraseña...")

      const res = await fetch(`${BASE_URL}/usuarios/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contrasena: newPassword
        })
      })

      if (!res.ok) throw new Error("Error")

      setMessage("✓ Contraseña actualizada")

      setTimeout(() => {
        setNewPassword("")
        setConfirmPassword("")
        setMessage("")
        onClose()
      }, 800)

    } catch (err) {
      console.error(err)
      setMessage("Error al cambiar contraseña")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="cp-modal-overlay">
      <div className="cp-modal">

        <div className="cp-header">
          <h3>Cambiar contraseña</h3>
        </div>

        <div className="cp-body">

          {/* NUEVA CONTRASEÑA */}
          <div className="cp-field">
            <label className="cp-label">Nueva contraseña</label>

            <div className="cp-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="cp-input"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                  setMessage("")
                }}
              />

              <span
                className="cp-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          {/* CONFIRMAR CONTRASEÑA */}
          <div className="cp-field">
            <label className="cp-label">Confirmar contraseña</label>

            <div className="cp-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="cp-input"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setMessage("")
                }}
              />

              <span
                className="cp-eye"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          <div className="cp-message">
            {loading && <span className="cp-spinner"></span>}
            {message}
          </div>

        </div>

        <div className="cp-actions">
          <button
            onClick={() => {
              setNewPassword("")
              setConfirmPassword("")
              setMessage("")
              onClose()
            }}
            className="workspace-close-btn flex-fix"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="workspace-btn primary"
          >
            {loading ? "Guardando..." : "Confirmar"}
          </button>
        </div>

      </div>
    </div>
  )
}

export default ChangePasswordModal