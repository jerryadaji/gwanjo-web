import { Container } from '@mui/material';
import MainNavbar from "./nav/MainNavbar"

const  AppLayout = ({children, className}) => {
  return(
    <>
      <MainNavbar/>
      <Container 
        maxWidth="lg" 
        sx={{
          marginTop: '5rem',
        }}
      >
        <div className={className + " mt-4"}>{children}</div>
      </Container>
    </>
	)
}

export default AppLayout;