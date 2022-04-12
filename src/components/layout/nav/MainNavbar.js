import { useUserAuth } from "../../../context/UserAuthContext";
import AccountMenu from "./AccountMenu";
import { Box, Button, Container, Link, Typography } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

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
            <Typography 
              gutterBottom 
              variant="body2" 
              component="div"
              sx={{
                alignItems: "center",
                cursor: "pointer",
                display: "flex",
                fontWeight: "medium",
                mb: 0,
              }}
            >
                in Abuja
                <KeyboardArrowDownOutlinedIcon fontSize="inherit"/>
            </Typography>
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