import { Col, Container, Row } from "react-bootstrap";
import MainNavbar from "./MainNavbar";

const  AuthLayout = ({children, className}) => {
  return(
    <>
      <MainNavbar/>
      <Container>
        <Row>
          <Col xs={4} className={className + " mx-auto mt-4"}>
            {children}
          </Col>
        </Row>
      </Container>
    </>
	)
}

export default AuthLayout;