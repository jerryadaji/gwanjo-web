import { Col, Container, Row } from "react-bootstrap";

const  AuthLayout = ({children}) => {
  return(
    <Container>
      <Row>
        <Col xs={4} className="mx-auto">
          {children}
        </Col>
      </Row>
    </Container>
	)
}

export default AuthLayout;