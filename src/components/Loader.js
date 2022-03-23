import { Box, CircularProgress } from '@mui/material';

const  Loader = () => {
return(
  <Box 
    sx={{ 
      alignItems: "center",
      display: "flex", 
      height: "50vh",
      justifyContent: "center",
      opacity: "0.15"
    }}
  >
    <CircularProgress color="inherit" />
  </Box>
	)
}

export default Loader;