import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/main/HomePage'
import { Box } from '@mui/material'
import img from './assets/images/QubeFlex.png'

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<HomePage />} />

            </Routes>
            <Box component="img" src={img} alt="QubeFlex" sx={style.img} />
        </>
    )
}

const style = {
    img: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: '200px',
        objectFit: 'cover',
        opacity: 0.3,
        zIndex: 9999
    }
}

export default App
