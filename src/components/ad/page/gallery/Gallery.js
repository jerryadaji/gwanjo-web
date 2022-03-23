import { Grid } from "@mui/material";
import { useState } from "react";
import Frame from './Frame';
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import Thumbnail from './Thumbnail';

const Gallery = ({ images }) => {
  const [active, setActive] = useState(0);

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
        <Frame background={images[active]}>
          <PrevButton onClick={gotoPrev} />
          <NextButton onClick={gotoNext} />
        </Frame>
      </Grid>
      <Grid item xs={12} md={2} lg={1}>
        {images.map( (image, index) => 
          <Thumbnail 
            key={index} 
            background={image.url} 
            isSelected={ index === active ? "isSelected" : "" } 
            onClick={() => updateActive(index)}
          />
          )}
      </Grid>
    </Grid>
  );
};
export default Gallery;
