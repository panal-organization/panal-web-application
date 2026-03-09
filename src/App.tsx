import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from "./pages/app/HomePage"
//import { Box } from '@mui/material'
//import img from './assets/images/QubeFlex.png'
import LandingPage from "./pages/public/LandingPage/LandingPage";
import AboutPage from "././pages/public/AboutPage/AboutPage"
import FeaturesPage from "./pages/public/FeaturesPage/FeaturesPage"
import PricingPage from "./pages/public/PricingPage/PricingPage"
import ContactPage from "./pages/public/ContactPage/ContactPage"
import ScrollToTop from "./components/ScrollToTop"

import LoginPage from "./pages/public/LoginPage/LoginPage"
import RegisterPage from "./pages/public/RegisterPage/RegisterPage"

import { ProtectedRoute } from "./components/ProtectedRoute"

const App: React.FC = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Navigate to="/landing" replace />} />
                <Route path="/landing" element={<LandingPage />} />


                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />

                <Route path="/about" element={<AboutPage />} />

                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/contact" element={<ContactPage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>

            {/* <Box component="img" src={img} alt="QubeFlex" sx={style.img} /> */}
        </>
    )
}



export default App
