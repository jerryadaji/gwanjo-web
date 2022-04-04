import { Paper, Typography } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CurrencyText from "../../elements/CurrencyText";

const AdInfo = ({ ad }) => {
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
        variant="h6" 
      >
        {ad.title}
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
        <CurrencyText value={ad.price} />
      </Typography>
    </Paper>
  )
}

export default AdInfo;