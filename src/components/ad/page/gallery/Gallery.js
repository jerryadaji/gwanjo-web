import { getDownloadURL, getStorage, ref, listAll } from "firebase/storage";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Frame from './Frame';
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import Thumbnail from './Thumbnail';

const Gallery = ({ adId }) => {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState([])

  const storage = getStorage();
  const listRef = ref(storage, 'images/' + adId);

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
            console.log(error)
          });
      });
    }).catch((error) => {
      console.log(error)
    });
  }, [])  


  // Update by clicking on thumbnail
  const updateActive = (value) => setActive(value);

  // Go to previous slide
  const gotoPrev = () => {
    active === 0 ? setActive(images.length - 1) : setActive(previousValue => --previousValue)
  }

  // Go to next slide
  const gotoNext = () => {
    active === (images.length - 1) ? setActive(0) : setActive(previousValue => ++previousValue)
  }

  return (
    <Grid container spacing={2} direction={{ md:"row-reverse"}}>
      <Grid item xs={12} md={10} lg={11}>
        <Frame url={images[active]}>
          <PrevButton onClick={gotoPrev} />
          <NextButton onClick={gotoNext} />
        </Frame>
      </Grid>
      <Grid item xs={12} md={2} lg={1}>
        {images.map( (url, index) => 
          <Thumbnail 
            key={index} 
            background={url} 
            isSelected={ index === active ? "isSelected" : "" } 
            onClick={() => updateActive(index)}
          />
          )}
      </Grid>
    </Grid>
  );
};
export default Gallery;
