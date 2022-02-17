import { Container } from "react-bootstrap";

const  AppLayout = ({children, className}) => {
  return(
    <Container>
      <div className={className + " mt-5"}>{children}</div>
    </Container>
	)
}

export default AppLayout;