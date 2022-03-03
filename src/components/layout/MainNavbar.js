import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

import { Button, Container, Grid, Typography } from '@mui/material';

const MainNavbar = () => {
  let { user } = useUserAuth();

  return(
    <div className="main-nav-wrapper">
      <Container maxWidth="lg">
        <div class="main-nav">
          <Link to="/" className="mr-1">
            <Typography 
              gutterBottom 
              variant="h4" 
              component="div"
              sx={{
                color: '#44079c',
                fontWeight: 700,
                fontSize: '1.75rem',
                mb: 0
              }}
            >
                gwanjo
            </Typography>
          </Link>
          <div className="text-right">          
            { !user && <AuthButtons /> }
            { user && <UserButtons/> }
          </div>
        </div>
      </Container>
    </div>
  )
}

const AuthButtons = ({children, className}) => {
  return (
    <>
      <Link to="/login" className="mr-1">Login In</Link>
      <Link to="/signup">Sign Up</Link>
    </>
  )
}

const UserButtons = ({children, className}) => {
  let { logOut } = useUserAuth();

  const handleLogOut = async () =>{
    try{
      await logOut();
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <Link to="/dashboard" className="mr-1">Dashboard</Link>
      <Link to="/create-ad" className="mr-1">Create Ad</Link>
      <Button variant="contained" onClick={ handleLogOut }>Log out</Button> 
    </>
  )
}

export default MainNavbar;