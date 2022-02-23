import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import GoogleButton from "react-google-button";
import AuthLayout from "../layout/AuthLayout";
import AuthWrapper from "./AuthWrapper";

const  Login = () => {
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const navigate = useNavigate();
  const { state } = useLocation();

  const { logIn, googleSignIn, user} = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try{
      await logIn(email, password);
      navigate(state?.redirectPath || "/dashboard");
    } catch(err) {
      setError(err.message)
    }
  }
  
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    
    try{
      await googleSignIn();
      navigate("/dashboard")
    }catch(err){
      setError(err.message)
    }
  }

  return(
    <AuthWrapper>
      <AuthLayout>
        <div className="p-4 card">
          <h5 className="mb-4">Log In</h5>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="email" 
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control 
                type="password" 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">Log In</Button>
            </div> 
            <div className="pt-3">
              <GoogleButton className="w-100" onClick={handleGoogleSignIn} />
            </div>
            <p className="mt-4 mb-0"><Link to="/forgot-password">Forgot your password?</Link></p>
          </Form>
        </div>
        <div className="p-4 box card mt-3 text-center">
          <p className="mb-0">Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </AuthLayout>
    </AuthWrapper>
  )
  
}

export default Login;