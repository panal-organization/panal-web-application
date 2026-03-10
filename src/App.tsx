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
import OrdersPage from "./pages/app/OrdersPage"

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
        RUTA RAÍZ
        ================================= */}

        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />

        {/* ===============================
        RUTAS PRIVADAS
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
  path="/orders"
  element={
    <ProtectedRoute>
      <OrdersPage />
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
        RUTAS PÚBLICAS (LOGIN / REGISTER)
        ================================= */}

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
        PÁGINAS MARKETING
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
          path="/about"
          element={
            <PublicRoute>
              <AboutPage />
            </PublicRoute>
          }
        />

        <Route
          path="/features"
          element={
            <PublicRoute>
              <FeaturesPage />
            </PublicRoute>
          }
        />

        <Route
          path="/pricing"
          element={
            <PublicRoute>
              <PricingPage />
            </PublicRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <PublicRoute>
              <ContactPage />
            </PublicRoute>
          }
        />

        {/* ===============================
        RUTA 404
        ================================= */}

        <Route
          path="*"
          element={
            token
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/" replace />
          }
        />

      </Routes>

    </>
  )
}

export default App