import { Box } from '@mui/material';

const Frame = ({ background, children }) => {
  return(
    <Box sx={{
      alignItems: "center",
      backgroundColor: "disabled",
      backgroundSize: "cover",
      backgroundImage: "url("+background.url+")",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      height: "500px",
      justifyContent: "space-between",
      transition: "all 0.4s ease"
    }}>
      {children}  
    </Box>
  )
}

export default Frame;