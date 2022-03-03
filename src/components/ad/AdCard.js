import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAd } from "../../context/AdContext";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';

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
            <CardContent>
              <Typography 
                gutterBottom 
                variant="h6" 
                component="div"
                sx={{
                  fontSize: '1rem',
                }}
              >
                  {data.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">₦25,000</Typography>
              {poster && <div><Link to="/edit-ad/">Edit</Link></div>}
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </Grid>
  )
}
export default Ad;