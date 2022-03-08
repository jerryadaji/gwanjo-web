import { Box, CircularProgress } from '@mui/material';

const  Loader = () => {
return(
  <Box 
    sx={{ 
      alignItems: "center",
      display: "flex", 
      height: "50vh",
      justifyContent: "center" 
    }}
  >
    <CircularProgress color="inherit" />
  </Box>
	)
}

export default Loader;