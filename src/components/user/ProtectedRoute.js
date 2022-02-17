import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import Loader from "../Loader";

const  ProtectedRoute = ({children}) => {
	let { user } = useUserAuth();
  let location = useLocation();

  // show loading component
  if( user === "" ){
    return (
      <Loader/>
    )
  }

  // Redirect to Log In page
  if( user === null ){
    // Update location state with current location
    return <Navigate to="/login" state={{ redirectPath: location.pathname }} />
  }

  // Show protected route
  return(
		<>{children}</>
	)
}

export default ProtectedRoute;