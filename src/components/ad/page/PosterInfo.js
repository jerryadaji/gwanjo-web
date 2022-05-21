import moment from 'moment';
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../../../firebase"
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import WhatsappOutlinedIcon from '@mui/icons-material/WhatsappOutlined';
import { useEffect, useState } from "react";
import Loader from "../../Loader";

const PosterInfo = ({posterId}) => {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  
  useEffect(() => {
    if(posterId){
      // Get user meta
      const getUserMeta = async () =>{
        const docRef = doc(db, "users", posterId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
          setUser(docSnap.data())
        }

        setIsLoading(false)
      }
      getUserMeta()
    }
  }, [posterId])

  if(isLoading){
    return <Loader/>
  }

  if(!isLoading && user){
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
             { user?.firstName?.substring(0,1) }{ user?.lastName?.substring(0,1) }
          </Avatar>
          <Box pl={1}>
            <Typography 
              fontWeight={"bold"} 
              mb={0}
              variant="body1"
            >
              { user?.firstName } { user?.lastName }
            </Typography>
            <Typography component="p" variant="caption">
            { moment(user?.creationTime).fromNow(true) } on Gwanjo
            </Typography>
          </Box>
        </Box>
        <Button 
          fullWidth
          href={"tel:"+user?.phone}
          sx={{ 
            borderRadius: '1.5rem',
            mb: 2,
            textTransform: 'capitalize'
          }}
          startIcon={<LocalPhoneOutlinedIcon />}
          variant="contained" 
        >
          {user?.phone}
        </Button>
        { user?.whatsApp &&
          <Button 
            fullWidth
            href={"https://wa.me/" + user?.whatsApp}
            target={"_blank"}
            sx={{ 
              borderRadius: '1.5rem',
              textTransform: 'capitalize'
            }}
            startIcon={<WhatsappOutlinedIcon />}
            variant="outlined" 
          >
            Send a Message
          </Button>
        }
      </Paper>
    )
  }
}

export default PosterInfo;