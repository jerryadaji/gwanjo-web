import { Markup } from "react-render-markup";
import { Box, Typography } from "@mui/material"

const AdDescription = ({description}) => {
  return(
    <Box mt={4}>
      <Typography 
        color="text.primary"
        mb={2}
        variant="h6" 
      >
        Description
      </Typography>
      <Box 
        color={"text.secondary"}
        variant="body2" 
      >
        <Markup markup={description} />
      </Box>
    </Box>
  )
}

export default AdDescription