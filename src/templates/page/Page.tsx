import React from 'react'
import { Box } from '@mui/material'
import PageStyle from './PageStyle'
import { Sidemenu, Header, Content } from '../../layout'

interface PageProps {
    children?: React.ReactNode
}

const Page: React.FC<PageProps> = ({ children }) => {
    const [open, setOpen] = React.useState(true)
    return (
        <Box sx={PageStyle.container}>
            <Sidemenu open={open} />
            <Box sx={PageStyle.body}>
                <Header open={open} setOpen={setOpen} />
                <Content children={children} />
            </Box>
        </Box>
    )
}

export default Page
