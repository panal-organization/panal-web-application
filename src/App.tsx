import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from "./pages/app/HomePage"
//import { Box } from '@mui/material'
//import img from './assets/images/QubeFlex.png'
import LandingPage from "./pages/public/LandingPage/LandingPage";

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/landing" replace />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>

           {/* <Box component="img" src={img} alt="QubeFlex" sx={style.img} /> */}
        </>
    )
} 



export default App
