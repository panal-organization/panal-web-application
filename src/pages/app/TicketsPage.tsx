import { Box } from "@mui/material"
import Page from "../../templates/page/Page"

import { useEffect } from "react"


const TicketsPage: React.FC = () => {

  
  useEffect(() => {
    document.title = "Tickets"
  }, [])

  return (
    <Page>
      <Box>
        Tickets
      </Box>
    </Page>
  )

}

export default TicketsPage