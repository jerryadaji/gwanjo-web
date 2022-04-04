import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

const PosterInfo = ({poster}) => {
  return(
    <Paper sx={{p: 2}} variant="outlined">
      <Box display={"flex"} mb={2}>
        <Avatar 
          sx={{ 
            bgcolor: "primary", 
            fontSize: "90%",
            height: 36, 
            width: 36
          }}
        >
          OP
        </Avatar>
        <Box pl={1}>
          <Typography 
            fontWeight={"bold"} 
            mb={0}
            variant="body1"
          >
            John Doe
          </Typography>
          <Typography component="p" variant="caption">
            6 months on Gwanjo
          </Typography>
        </Box>
      </Box>
      <Button 
        fullWidth
        href="tel:08031234567"
        sx={{ 
          borderRadius: '1.5rem',
          textTransform: 'capitalize'
        }}
        startIcon={<LocalPhoneOutlinedIcon />}
        variant="contained" 
      >
        08031234567
      </Button>
    </Paper>
  )
}

export default PosterInfo;