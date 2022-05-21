import moment from 'moment';
import { Avatar, Box, Button,Link, Paper, Typography } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const UserProfile = ({user}) => {
  return(
    <Paper 
      sx={{
        p: 4,
        pb: 3, 
        position: "relative",
        textAlign: "center"
      }} 
      variant="outlined"
    >
      <Box 
        alignItems={"center"}
        display={"flex"}
        flexDirection={"column"}
        mb={2}
        textAlign={"center"} 
      >
        <Avatar 
          sx={{ 
            bgcolor: "secondary", 
            height: 80, 
            mb: 2,
            width: 80
          }}
        >
          { user?.firstName.substring(0,1) }{ user?.lastName.substring(0,1) }
        </Avatar>
        <Typography 
          fontWeight={"bold"} 
          mb={0}
          variant="subtitle1"
        >
          { user?.firstName } { user?.lastName }
        </Typography>
        <Typography component="p" variant="caption">
        { moment(user?.creationTime).fromNow(true) } on Gwanjo
        </Typography>
      </Box>

      <Typography 
        component={"span"} 
        variant={"caption"}
      >
        <Link href="/user-details">
          <EditOutlinedIcon fontSize="inherit" />
          <Box display={"inline"} pl={0.5}>Edit Profile</Box>
        </Link>
      </Typography>
    </Paper>
  )
}

export default UserProfile;