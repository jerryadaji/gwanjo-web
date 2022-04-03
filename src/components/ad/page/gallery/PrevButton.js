import { Box } from "@mui/material";
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';

const PrevButton = ({onClick}) => {
  return(
    <Box 
      onClick={onClick}
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "2px",
        cursor: "pointer",
        display: "flex",
        ml: 2,
        opacity: 0.3,
        px: 1,
        py: 2,
        transition: "all 0.4s ease",

        '&:hover': {
          opacity: 0.8
        },
      }}
    >
      <NavigateBeforeOutlinedIcon/>
    </Box>
  )   
}
export default PrevButton;