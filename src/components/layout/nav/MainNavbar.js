import { Link } from "react-router-dom";
import { useUserAuth } from "../../../context/UserAuthContext";

import { Button, Container, Grid, Typography } from '@mui/material';
import AccountMenu from "./AccountMenu";



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
            <Button 
              href="/create-ad" 
              variant="contained"
              sx={{ 
                backgroundColor: '#44079c',
                borderRadius: '1.5rem',
                textTransform: 'capitalize'
              }}
            >Sell</Button> 
            { user && <AccountMenu/> }
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
      <Link to="/signup" className="mr-1">Sign Up</Link>
    </>
  )
}

export default MainNavbar;