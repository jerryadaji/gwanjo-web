import { Box, Grid, Typography } from "@mui/material";
import upload from "../../images/icons/upload.png"

const EmptyState = () => {
  return(
    <Grid 
      item 
      xs={12} 
    >
      <Box textAlign={"center"} sx={{cursor: "pointer"}}>
        <img src={upload} alt="Mail sent" height={40} />
        <Typography variant="caption" component="p">
          Drag and drop or {" "}
          <Typography 
            color="primary" 
            component="span"
            fontWeight="bold"
            variant="inherit"
          >
            click to browse
          </Typography> {" "}
          images
        </Typography>
      </Box>
    </Grid>
  )
}

export default EmptyState;