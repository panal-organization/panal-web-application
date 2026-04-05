import { useState, useEffect, useRef } from "react"
import Page from "../../templates/page/Page"
import { useAuth } from "../../context/AuthContext"

import SettingsIcon from "@mui/icons-material/Settings"
import LockIcon from "@mui/icons-material/Lock"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import EmailIcon from "@mui/icons-material/Email"
import { FaRocket } from "react-icons/fa"

import ChangePasswordModal from "../../components/ui/ChangePasswordModal"

import "./ProfilePage.css"

const ProfilePage = () => {
  const { user } = useAuth()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const FREE_PLAN_ID = "69a3de4281a5be4cb1bd8bc0"

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "Ajustes de cuenta"
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user?._id) return

        const res = await fetch(`/api/usuarios/${user._id}`, {
          headers: {
  "Content-Type": "application/json"
}
        })

        const data = await res.json()
        setUserData(data)

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [user])

  const isPremium =
    userData?.plan_id && String(userData.plan_id) !== FREE_PLAN_ID

  // 🔥 FUNCIÓN BIEN COLOCADA
  const handleImageChange = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      // preview inmediato
      const previewUrl = URL.createObjectURL(file)

      setUserData((prev: any) => ({
        ...prev,
        foto: previewUrl
      }))

      // subir imagen
      const fd = new FormData()
      fd.append("file", file)
      if (!user?._id) {
  console.warn("Usuario no disponible")
  return
}

fd.append("usuario_id", user._id)
      fd.append("tipo", "perfil")

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd
      })

      const data = await res.json()
      const imageUrl = data?.archivo?.url || data?.url

      // guardar en BD
      await fetch(`/api/usuarios/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          foto: imageUrl
        })
      })

      // actualizar final
      setUserData((prev: any) => ({
        ...prev,
        foto: imageUrl
      }))

    } catch (err) {
      console.error("Error subiendo imagen:", err)
    }
  }

  return (
    <Page>

      {/* HEADER */}
      <div className="orders-header">
        <h2 className="orders-title">
          <SettingsIcon className="orders-title-icon" />
          Ajustes de cuenta
        </h2>
      </div>

      {/* TOOLBAR */}
      <div className="orders-toolbar">
        <button
          className="orders-create-btn3"
          onClick={() => setIsPasswordModalOpen(true)}
        >
          <LockIcon />
          Cambiar contraseña
        </button>
      </div>

      {/* CONTENIDO */}
      <div className="profile-container">

        {loading && <p>Cargando perfil...</p>}

        {!loading && userData && (
          <>
            <div className="profile-header">

              {/* AVATAR */}
              <div className="profile-avatar">

                <div className="profile-avatar-inner">
                  {userData?.foto ? (
                    <img src={userData.foto} alt="avatar" />
                  ) : (
                    <div className="profile-initial">
                      {userData?.nombre?.charAt(0)}
                    </div>
                  )}
                </div>

                {/* INPUT OCULTO */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />

                {/* BOTÓN */}
                <div
                  className="profile-camera"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <CameraAltIcon />
                </div>

              </div>

              {/* INFO */}
              <div className="profile-info">
                <h2>{userData?.nombre}</h2>
                <p>{userData?.correo}</p>

                <div className="profile-badges">
                  <span className={`plan-badge ${isPremium ? "premium" : "free"}`}>
                    {isPremium ? "Premium" : "Free"}
                  </span>

                  <span
                    className={`status-badge ${
                      userData?.estatus ? "active" : "inactive"
                    }`}
                  >
                    {userData?.estatus ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </div>

            </div>

            {/* GRID */}
            <div className="profile-grid">

              <div className="card">
                <div className="card-circle-icon orange">
                  <EmailIcon />
                </div>

                <div className="card-titlex">
                  <h3>Información</h3>
                </div>

                <div className="card-item">
                  <strong>Correo</strong>
                  <span>{userData?.correo}</span>
                </div>

                <div className="card-item">
                  <strong>Estado</strong>
                  <span>{userData?.estatus ? "Activo" : "Inactivo"}</span>
                </div>
              </div>

              <div className="card">
                <div className="card-circle-icon blue">
                  <FaRocket />
                </div>

                <div className="card-titlex">
                  <h3>Cuenta</h3>
                </div>

                <div className="card-item">
                  <strong>Miembro desde</strong>
                  <span>
                    {userData?.createdAt
                      ? new Date(userData.createdAt).toLocaleDateString()
                      : "-"}
                  </span>
                </div>

                <div className="card-item">
                  <strong>Actualizado</strong>
                  <span>
                    {userData?.updatedAt
                      ? new Date(userData.updatedAt).toLocaleDateString()
                      : "-"}
                  </span>
                </div>

              </div>

            </div>
          </>
        )}

      </div>

      {/* MODAL */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        user={user}
      />

    </Page>
  )
}

export default ProfilePage