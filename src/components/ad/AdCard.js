import { useState } from "react";
import { Link } from "react-router-dom";
import { useAd } from "../../context/AdContext";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const Ad = ({data, isMine}) => {
  const [poster, setPoster]= useState("")
  let { users } = useAd();

  if(isMine){
    const getUsers = async () =>{
      try{
        if(users){
          const found = await users.find(user => user.uid === data.uid);
          setPoster(found)
        }
      }catch(err){
        console.log(err)
      }
    }

    getUsers()
  }

  return(
    <Grid item xs={6} md={3}>
      <Card sx={{ maxWidth: 345 }}>
        <Link to={"/ad/"+data.id}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={"https://picsum.photos/seed/"+data.id+"/300/150"}
              alt="Card cap"
            />
            <CardContent
              sx={{
                p: '0.8rem',
              }}
            >
              <Typography 
                gutterBottom 
                variant="body2" 
                component="p"
                sx={{
                  color: "text.primary",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >{data.title}</Typography>
              <Typography 
                variant="subtitle2" 
                color="primary"
              >₦25,000</Typography>
              {poster && <div><Link to="/edit-ad/">Edit</Link></div>}
              <Typography 
                variant="caption" 
                color="text.secondary"
                component="div"
                sx={{
                  alignItems: "center",
                  display: "flex",
                  mt: 1
                }}
              >
                <LocationOnOutlinedIcon fontSize="inherit"/>
                Abuja
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </Grid>
  )
}
export default Ad;