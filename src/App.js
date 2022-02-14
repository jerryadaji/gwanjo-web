import { Routes, Route } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import Home from "./components/Home"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import './App.css';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="login" element={ <Login/> }/>
            <Route path="signup" element={ <Signup />}/>
          </Routes>    
        </Col>
      </Row>
    </Container>
  );
}

export default App;
