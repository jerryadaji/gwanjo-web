import { Box, Grid } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import noImage from "../../images/icons/no_image.png";

const Preview = ({image, id, remove}) => {
  return(
    <Grid 
      item 
      xs={3} 
      md={2}
    >
      <Box
        style={{ backgroundImage: "url('" + ( ( image.url ) ? image.url : noImage ) + "')" }}
        sx={{
          alignItems: "center",
          backgroundColor: "#D8D8D8",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          borderRadius: "4px",
          display: "flex",
          height: "4rem",
          justifyContent: "center",
          position: "relative", 
          zIndex: "tooltip"
        }}
      >
        <Box 
          onClick={() => remove(id)}
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            height: "2.5rem",
            opacity: (image.uploadProgress > 0) ? "0.8" : "0.5",
            px: 1,
            py: 1,
            transition: "all 0.4s ease",
            width: "2.5rem",

            '&:hover': {
              opacity: 0.8
            },
          }}
        >
          { (image.uploadProgress === 0) ? <CloseOutlinedIcon/> : "" }
          { (image.uploadProgress > 0 && image.uploadProgress < 100) ? (image.uploadProgress + "%") : "" }
          { (image.uploadProgress === 100) ? <CheckOutlinedIcon color="primary" /> : "" }
        </Box>
      </Box>
    </Grid>
  )
}

export default Preview;