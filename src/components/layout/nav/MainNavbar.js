import { useUserAuth } from "../../../context/UserAuthContext";
import AccountMenu from "./AccountMenu";
import LocationModal from "../../elements/modals/LocationModal";
import { Box, Button, Container, Link, Typography } from '@mui/material';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';


const MainNavbar = () => {
  let { user } = useUserAuth();

  return(
    <>
      <Box bgcolor="secondary.light" display={{ xs: "block", sm: "block", md: "none" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "flex-start"
            }}
          >
            <LocationOnOutlinedIcon  fontSize="inherit"/>
            <Box sx={{ flexGrow: 1, ml: "0.25rem" }}>
              <LocationModal />
            </Box>
          </Box>
        </Container>
      </Box>
      <Box className="main-nav-wrapper">
        <Container maxWidth="lg">
          <Box className="main-nav">
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
              <Box display={{ xs: "none", md: "block" }}>
                <LocationModal />
              </Box>
            </Box>
            <Box className="text-right">      
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
            </Box>
          </Box>
        </Container>
      </Box>
    </>
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