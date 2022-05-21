import AdList from "./ad/AdList";
import AppLayout from "./layout/AppLayout";

import { Grid, Typography } from '@mui/material';
import CategoriesList from "./elements/categorieslist/CategoriesList";


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
        Buy & Sell anything, from anywhere
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <CategoriesList/>
        </Grid>
        <Grid item xs={12} md={9}>
          <AdList/>
        </Grid>
      </Grid>
		</AppLayout>
	)
}

export default Home;