import { Box } from "@mui/material";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';

const NextButton = ({onClick}) => {
  return(
    <Box 
      onClick={onClick}
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "2px",
        cursor: "pointer",
        display: "flex",
        mr: 2,
        opacity: 0.3,
        px: 1,
        py: 2,
        transition: "all 0.4s ease",

        '&:hover': {
          opacity: 0.8
        },
      }}
    >
      <NavigateNextOutlinedIcon/>
    </Box>
  )   
}
export default NextButton;