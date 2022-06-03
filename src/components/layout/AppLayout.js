import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import Footer from './Footer';
import MainNavbar from "./nav/MainNavbar"

const Root = styled('div')(({ theme }) => ({
  marginTop: '1rem',
  [theme.breakpoints.up('md')]: {
    marginTop: '4.25rem',
  },
}));

const  AppLayout = ({children, hasBreadcrumb, className}) => {
  return(
    <>
      <MainNavbar/>
      <Container 
        maxWidth="lg" 
        sx={{
          minHeight: "calc(100vh - 9rem)",
        }}
      >
         <Root>
          {children}
         </Root>
      </Container>
      <Footer/>
    </>
	)
}

export default AppLayout;