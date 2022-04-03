import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, listAll } from "firebase/storage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAd } from "../../context/AdContext";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Grid, IconButton } from '@mui/material';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const Ad = ({data, isMine}) => {
  const [poster, setPoster]= useState("");
  const [images, setImages]= useState("");
  const [error, setError]= useState("");
  let { users } = useAd();

  const navigate = useNavigate();

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

  // Get Image
  const storage = getStorage();
  const listRef = ref(storage, 'images/' + data.id);

  useEffect(() => {
    // Find all the prefixes and items.
    listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef)
          .then((url) => {
            setImages(prev => [...prev, url])
          })
          .catch((error) => {
            setError("Something went wrong.")
          });
      });
    }).catch((error) => {
      setError("Something went wrong.")
    });
  }, []) 
  

  return(
    <Grid item xs={6} md={3}>
      <Card sx={{ maxWidth: 345 }}>
        <Link to={"/ad/"+data.id}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={images[0]}
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
        {isMine && 
          <CardActions disableSpacing>
            <IconButton 
              aria-label="Edit Ad"
              onClick={() => navigate("/edit-ad/" + data.id)}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="share">
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </CardActions>
          }
      </Card>
    </Grid>
  )
}
export default Ad;