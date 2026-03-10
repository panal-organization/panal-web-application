import { Box } from "@mui/material"
import Page from "../../templates/page/Page"

import { useEffect } from "react"


const NotificationsPage: React.FC = () => {
  

 useEffect(() => {
    document.title = "Notificaciones"
  }, [])


  return (
    <Page>
      <Box>
        Notificaciones
      </Box>
    </Page>
  )

}

export default NotificationsPage