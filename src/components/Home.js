import React from "react";
import AdList from "./ad/AdList";
import AppLayout from "./layout/AppLayout";

import { Grid, Typography } from '@mui/material';


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
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          Sidebar
        </Grid>
        <Grid item xs={12} md={8}>
          <AdList/>
        </Grid>
        <Grid item xs={12} md={2}>
          Ads
        </Grid>
      </Grid>
		</AppLayout>
	)
}

export default Home;