import { useEffect, useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, listAll } from "firebase/storage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase"
import { useAd } from "../../context/AdContext";



import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Grid, IconButton } from '@mui/material';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DeleteConfirmation from "./DeleteConfirmation";

import noImage from "../../images/icons/no_image.png"
import CurrencyText from "../elements/CurrencyText";
import locationsData from "../../data/locationsData";


const Ad = ({data, isMine}) => {
  const [poster, setPoster]= useState("");
  const [images, setImages]= useState("");
  const [location, setLocation]= useState("");
  const [cloudRefPaths, setCloudRefPaths]= useState([]);
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

  // Location
  useEffect(()=>{
    if(data.region){
      const findLocation = locationsData.filter(region => region.id === data.region)
      setLocation(findLocation[0].region)
    }
  },[])

  // Get Image
  const storage = getStorage();
  const listRef = ref(storage, 'images/' + data.id);

  useEffect(() => {
    // Find all the prefixes and items.
    listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // Save all refs
        setCloudRefPaths(prev => [...prev, itemRef.fullPath])

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

  const deleteAd = async () => {
    try {
      // Delete Ad
      await deleteDoc(doc(db, "ads", data.id)).then(() => {
        // Remove images
        cloudRefPaths.forEach(path => {
          const desertRef = ref(storage, path);
    
          // Delete the file
          deleteObject(desertRef).then(() => {
            // File deleted
          }).catch((error) => {
            setError("Something went wrong with removing the image. Try again.")
          });
        })
      });
    } catch (err) {
      setError("Something went wrong. The Ad wasn't deleted. Try again.")
    }  
  }
  

  return(
    <Grid item xs={6} md={3}>
      <Card sx={{ maxWidth: 345 }}>
        <Link to={"/ad/"+data.id}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={ (images.length) ? images[0] : noImage } 
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
                variant="body2" 
                color="primary"
                fontWeight={"bold"}
              >
                <CurrencyText value={data.price} />
              </Typography>
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
                {location || "Somewhere in Nigeria"}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        {isMine && 
          <CardActions disableSpacing>
            <IconButton 
              aria-label="Edit ad"
              onClick={() => navigate("/edit-ad/" + data.id)}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <DeleteConfirmation action={deleteAd} data={data} image={ (images.length) ? images[0] : noImage } />
          </CardActions>
          }
      </Card>
    </Grid>
  )
}
export default Ad;