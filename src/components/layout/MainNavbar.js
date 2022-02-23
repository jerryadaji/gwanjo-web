import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

const MainNavbar = () => {
  let { user } = useUserAuth();

  return(
    <div className="bg-light pt-3 pb-3">
      <Container>
        <Row>
          <Col>
            <Link to="/" className="mr-1">Home</Link>
          </Col>
          <Col className="text-right">          
            { !user && <AuthButtons /> }
            { user && <UserButtons/> }
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const AuthButtons = ({children, className}) => {
  return (
    <>
      <Link to="/login" className="mr-1">Login In</Link>
      <Link to="/signup">Sign Up</Link>
    </>
  )
}

const UserButtons = ({children, className}) => {
  let { logOut } = useUserAuth();

  const handleLogOut = async () =>{
    try{
      await logOut();
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <Link to="/dashboard" className="mr-1">Dashboard</Link>
      <Link to="/create-ad" className="mr-1">Create Ad</Link>
      <Button variant="primary" onClick={ handleLogOut }>Log out</Button> 
    </>
  )
}

export default MainNavbar;