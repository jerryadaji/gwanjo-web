import { Grid, Link, Typography } from "@mui/material";
import React from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import UserProfile from "../elements/widgets/UserProfile";
import AppLayout from "../layout/AppLayout";
import UserAdList from "./UserAdList";

const  Dashboard = () => {
  let { user } = useUserAuth();

  return(
		<AppLayout>
      <Typography 
        component="h1" 
        mb={1}
        variant="h5" 
      >
        My Ads
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <UserProfile user={{...user.data, ...user.metadata}} />
        </Grid>
        <Grid item xs={12} md={8}>
          <UserAdList/>
        </Grid>
      </Grid>
		</AppLayout>
	)
}

export default Dashboard;