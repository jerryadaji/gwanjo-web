import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import AppLayout from "../layout/AppLayout";

const  Settings = () => {
  let { user, logOut } = useUserAuth();
  const handleLogOut = async () =>{
    try{
      await logOut();
    }catch(err){
      console.log(err);
    }
  }
  return(
		<AppLayout>
      <h1>Settings</h1>
      <h6>{user && user.email}</h6>
      <Button variant="primary" onClick={ handleLogOut }>Log out</Button>
		</AppLayout>
	)
}

export default Settings;