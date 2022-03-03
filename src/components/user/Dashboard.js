import React from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import AppLayout from "../layout/AppLayout";
import UserAdList from "./UserAdList";

const  Dashboard = () => {
  let { user } = useUserAuth();
  
  return(
		<AppLayout>
      <h5>Dashboard</h5>
      <h6>{user && user.email}</h6>
      <div><Link to="/settings">Setting</Link></div>
      <p className="mb-4"><Link to="/forgot-password">Change Password</Link></p>
      <h6>My Ads</h6>
      <UserAdList/>
		</AppLayout>
	)
}

export default Dashboard;