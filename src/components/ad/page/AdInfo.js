import { Paper, Typography } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const AdInfo = ({ title }) => {
  return(
    <Paper
      sx={{
        p: 2,
        mb: 1
      }}
      variant="outlined"
    >
      <Typography 
        component="h1" 
        mb={1}
        variant="h5" 
      >
        {title}
      </Typography>

      <Typography 
        color="text.secondary"
        component="div"
        sx={{
          alignItems: "center",
          display: "flex",
          mb: 1
        }}
        variant="body1" 
      >
        <LocationOnOutlinedIcon fontSize="inherit"/>
        Abuja
      </Typography>

      <Typography 
        color="primary"
        fontWeight={700}
        variant="h4" 
      >
        ₦25,000
      </Typography>
    </Paper>
  )
}

export default AdInfo;