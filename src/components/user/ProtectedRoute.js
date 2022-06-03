import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import Loader from "../Loader";
import UserDetailsForm from "./UserDetailsForm";

const  ProtectedRoute = ({children}) => {
  const [userStatus, setUserStatus] = useState("")
	let { user } = useUserAuth();
  let location = useLocation();

  useEffect( () => {
    if( user?.data?.status ){
      setUserStatus(user.data.status)
    }
  }, [user])

  // show loading component
  if( user === "" || (user && userStatus === "") ){
    return (
      <Loader/>
    )
  }

  // Redirect to Log In page if user is not logged in
  if( user === null ){
    // Update location state with current location
    return <Navigate to="/login" state={{ redirectPath: location.pathname }} />
  }

  if( userStatus === "pending"){
    // Redirect to user details form if user has not added user details
    return <UserDetailsForm redirectPath={ location.pathname } />
  } else {
    // Show protected route
    return <>{children}</>
  }
}

export default ProtectedRoute;