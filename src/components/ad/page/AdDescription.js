import { Markup } from "react-render-markup";
import { Box, Paper, Typography } from "@mui/material"

const AdDescription = ({description}) => {
  return(
    <Paper
      sx={{
        p: 3,
        pb: 1,
        mb: 1
      }}
      variant="outlined"
    >
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
    </Paper>
  )
}

export default AdDescription