import { Box } from '@mui/material';

const Frame = ({ url, children }) => {
  return(
    <Box sx={{
      alignItems: "center",
      backgroundColor: "#ffffff",
      backgroundSize: "cover",
      backgroundImage: "url('"+url+"')",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      height: "500px",
      justifyContent: "space-between",
      transition: "opacity 0.4s ease"
    }}>
      {children}  
    </Box>
  )
}

export default Frame;