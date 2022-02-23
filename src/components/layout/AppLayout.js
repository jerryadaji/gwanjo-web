import { Container } from "react-bootstrap";
import MainNavbar from "./MainNavbar"

const  AppLayout = ({children, className}) => {
  return(
    <>
      <MainNavbar/>
      <Container>
        <div className={className + " mt-4"}>{children}</div>
      </Container>
    </>
	)
}

export default AppLayout;