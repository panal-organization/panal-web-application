import { Route, Routes, Navigate } from "react-router-dom"

import { useAuth } from "./context/AuthContext"

import { ProtectedRoute } from "./components/ProtectedRoute"
import { PublicRoute } from "./components/PublicRoute"
import ScrollToTop from "./components/ScrollToTop"

/* ===============================
PÁGINAS PRIVADAS (APP)
Solo usuarios autenticados
================================= */

import HomePage from "./pages/app/HomePage"
import ProfilePage from "./pages/app/ProfilePage"
import TicketsPage from "./pages/app/TicketsPage"
import NotificationsPage from "./pages/app/NotificationsPage"

/* ===============================
PÁGINAS PÚBLICAS (LANDING)
Accesibles sin sesión
================================= */

import LandingPage from "./pages/public/LandingPage/LandingPage"
import AboutPage from "./pages/public/AboutPage/AboutPage"
import FeaturesPage from "./pages/public/FeaturesPage/FeaturesPage"
import PricingPage from "./pages/public/PricingPage/PricingPage"
import ContactPage from "./pages/public/ContactPage/ContactPage"

import LoginPage from "./pages/public/LoginPage/LoginPage"
import RegisterPage from "./pages/public/RegisterPage/RegisterPage"


const App: React.FC = () => {

  const { loading, token } = useAuth()

  /* ===============================
  Esperar a que AuthContext revise
  si hay sesión en localStorage
  Evita parpadeos de rutas
  ================================= */

  if (loading) {
    return null
  }

  return (

    <>
      <ScrollToTop />

      <Routes>

        {/* ===============================
        RUTA RAÍZ INTELIGENTE
        Si hay sesión → dashboard
        Si no hay sesión → landing
        ================================= */}

        <Route
          path="/"
          element={
            token
              ? <Navigate to="/dashboard" replace />
              : <LandingPage />
          }
        />

        {/* ===============================
        RUTAS PRIVADAS
        Requieren autenticación
        ================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <TicketsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        {/* ===============================
        RUTAS PÚBLICAS
        Solo accesibles si NO hay sesión
        ================================= */}

        <Route
          path="/landing"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* ===============================
        PÁGINAS PÚBLICAS DE INFORMACIÓN
        Siempre accesibles
        ================================= */}

        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />

      </Routes>

    </>
  )
}

export default App