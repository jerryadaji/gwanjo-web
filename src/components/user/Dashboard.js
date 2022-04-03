import { Grid, Link, Typography } from "@mui/material";
import React from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import PosterInfo from "../ad/page/PosterInfo";
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
          <PosterInfo poster={user}/>
          <Typography component={"p"}>{user && user.email}</Typography>
          <Typography component={"p"}>
            <Link href="/settings">Setting</Link>
          </Typography>
          <Typography component={"p"}>
            <Link href="/forgot-password">Change Password</Link>
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <UserAdList/>
        </Grid>
      </Grid>
		</AppLayout>
	)
}

export default Dashboard;