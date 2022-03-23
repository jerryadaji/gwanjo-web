import { Box, Grid } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Preview = ({url, id, remove}) => {
  return(
    <Grid 
      item 
      xs={2} 
      md={2}
    >
      <Box
        style={{ backgroundImage: "url("+url+")" }}
        sx={{
          alignItems: "center",
          backgroundColor: "#D8D8D8",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          borderRadius: "4px",
          display: "flex",
          height: "4rem",
          justifyContent: "center"
        }}
      >
        <Box 
          onClick={() => remove(id)}
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            opacity: 0.3,
            px: 1,
            py: 1,
            transition: "all 0.4s ease",

            '&:hover': {
              opacity: 0.8
            },
          }}
        >
          <CloseOutlinedIcon/>
        </Box>
      </Box>
    </Grid>
  )
}

export default Preview;