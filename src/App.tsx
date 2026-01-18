import { Box } from '@mui/material'
import AppLayout from './layout/AppLayout'

const App: React.FC = () => {
    return (
        <Box>
            Main
        </Box>
    )
}

const Page: React.FC = () => <AppLayout children={<App />} />

export default Page
