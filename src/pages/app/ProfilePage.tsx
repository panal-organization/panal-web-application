import { Box } from "@mui/material"
import Page from "../../templates/page/Page"


import { useEffect } from "react"



  

 

const ProfilePage: React.FC = () => {

  useEffect(() => {
    document.title = "Ajustes de cuenta"
  }, [])


  return (
    <Page>
      <Box>
        Perfil
      </Box>
    </Page>
  )
}

export default ProfilePage