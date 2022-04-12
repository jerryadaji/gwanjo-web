import { Box, Container } from '@mui/material';
import Footer from './Footer';
import MainNavbar from "./nav/MainNavbar"

const  AppLayout = ({children, hasBreadcrumb, className}) => {
  return(
    <>
      <MainNavbar/>
      <Container 
        maxWidth="lg" 
        sx={{
          pt: ( hasBreadcrumb ? "2rem" : "3rem" ),
          minHeight: "calc(100vh - 9rem)",
          mt: 4
        }}
      >
        {children}
      </Container>
      <Footer/>
    </>
	)
}

export default AppLayout;