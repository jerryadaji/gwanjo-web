import { Container } from '@mui/material';
import Footer from './Footer';
import MainNavbar from "./nav/MainNavbar";

const  AuthLayout = ({children, className}) => {
  return(
    <>
      <MainNavbar/>
      <Container 
        maxWidth="xs"
        sx={{
          pt: '4rem',
          minHeight: "calc(100vh - 8rem)",
          mt: 4
        }}
      >
        {children}
      </Container>
      <Footer/>
    </>
	)
}

export default AuthLayout;