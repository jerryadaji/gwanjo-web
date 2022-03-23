import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import Loader from "../Loader";
import "./auth.scss"

const  AuthWrapper = ({children}) => {
	let { user } = useUserAuth();

  // show loading component
  if( user === "" ){
    return (
      <Loader/>
    )
  }

  // Redirect to route
  if( user === null ){
    return (
      <>{children}</>
    )
  }

  // Go to dashboard route
  if( user ){
    return(
      <Navigate to="/dashboard"/>
    )
  }
}

export default AuthWrapper;