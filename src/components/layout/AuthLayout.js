import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import Footer from './Footer';
import MainNavbar from "./nav/MainNavbar";

const Root = styled('div')(({ theme }) => ({
  marginTop: '2rem',
  [theme.breakpoints.up('md')]: {
    marginTop: '7.25rem',
  },
}));

const  AuthLayout = ({children, className}) => {
  return(
    <>
      <MainNavbar/>
      <Container 
        maxWidth="xs"
        sx={{ minHeight: "calc(100vh - 8rem)" }}
      >
        <Root>
          {children}
        </Root>
      </Container>
      <Footer/>
    </>
	)
}

export default AuthLayout;