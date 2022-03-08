import { Container } from '@mui/material';
import MainNavbar from "./nav/MainNavbar";

const  AuthLayout = ({children, className}) => {
  return(
    <>
      <MainNavbar/>
      <Container 
        maxWidth="xs"
        sx={{
          marginTop: '5rem',
        }}
      >
        <div className={className + " mx-auto mt-4"}>
          {children}
        </div>
      </Container>
    </>
	)
}

export default AuthLayout;