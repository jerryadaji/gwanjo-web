import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EmptyState from "./EmptyState";
import Preview from "./Preview";

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if(images.length){
      const newImageUrls = [];
      images.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
      setImageUrls(newImageUrls)
    }
  }, [images]);

  const onImageChange = (e) => {
    setImages(prev => {
      return [...prev, ...e.target.files]
    })
  }

  const remove = id => {
    console.log("Remove: ", id)
  }

  return(
    <Box>
      <Typography 
        color="text.secondary"
        component="p"
        fontWeight={"medium"}
        mb={1}
        mt={2}
        variant="body1" 
      >
        Add images
      </Typography>
      <Box
        border={"1px solid #D8D8D8"}
        p={1}
        borderRadius="2px"
      >
        <Grid container spacing={1}>
          { imageUrls.map( (url, index) =>  <Preview key={index} id={1} remove={remove} url={url} /> ) }
          { !imageUrls.length && <EmptyState/> }
        </Grid>
        <input type="file" multiple accept="image/*" onChange={onImageChange} />
      </Box>
    </Box>
  )
}

export default ImageUploader