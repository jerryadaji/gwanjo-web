import React from "react";
import AdList from "./ad/AdList";
import AppLayout from "./layout/AppLayout";

import { Typography } from '@mui/material';


const  Home = () => {
  return(
		<AppLayout>
      <Typography 
        gutterBottom 
        variant="h5" 
        component="div"
        sx={{
          mb: 4
        }}
      >
        Buy anything, from anywhere
      </Typography>
      <AdList/>
		</AppLayout>
	)
}

export default Home;