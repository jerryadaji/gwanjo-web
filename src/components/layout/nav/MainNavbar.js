import { useUserAuth } from "../../../context/UserAuthContext";
import AccountMenu from "./AccountMenu";
import LocationModal from "../../elements/modals/LocationModal";
import { Box, Button, Container, Link, Typography } from '@mui/material';

const MainNavbar = () => {
  let { user } = useUserAuth();

  return(
    <div className="main-nav-wrapper">
      <Container maxWidth="lg">
        <div className="main-nav">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "flex-start"
            }}
          >
            <Link href="/" sx={{mr: 1, textDecoration: "none"}}>
              <Typography 
                gutterBottom 
                variant="h4" 
                component="div"
                sx={{
                  color: 'primary',
                  fontWeight: 700,
                  fontSize: '1.75rem',
                  mb: 0
                }}
              >
                  Gwanjo
              </Typography>
            </Link>
            <LocationModal />
          </Box>
          <div className="text-right">      
            { !user && <AuthButtons /> }
            <Button 
              href="/create-ad" 
              variant="outlined"
              sx={{ 
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
      <Link href="/login" sx={{mr: 3, textDecoration: "none"}}>Login In</Link>
      <Link href="/signup" sx={{mr: 3, textDecoration: "none"}}>Sign Up</Link>
    </>
  )
}

export default MainNavbar;