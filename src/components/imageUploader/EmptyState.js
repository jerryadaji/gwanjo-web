import { Box, Button, Typography } from "@mui/material";
import upload from "../../images/icons/upload.png"

const EmptyState = () => {
  return(
    <Box textAlign={"center"}>
      <img src={upload} alt="Mail sent" height={40} />
      <Typography variant="caption" component="p">
        Drag and drop or {" "}
        <Typography 
          color="primary" 
          component="span"
          fontWeight="medium"
          variant="inherit"
        >
          browse
        </Typography> {" "}
        images
      </Typography>
    </Box>
  )
}

export default EmptyState;