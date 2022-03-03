import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../firebase"
import GoogleButton from "react-google-button";
import AuthLayout from "../layout/AuthLayout";
import AuthWrapper from "./AuthWrapper";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  

  const navigate = useNavigate()

  const { signUp, googleSignIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try{
      const newUserRef =  await signUp(email, password);
      
      await addDoc(collection(db, "users"), {
        uid: newUserRef.user.uid,
        email: newUserRef.user.email
      });
      
      navigate('/login')
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
          <h5 className="mb-4">Sign Up</h5>
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
              <Button variant="primary" type="submit">Sign Up</Button>
            </div> 
            <div className="pt-3">
              <GoogleButton className="w-100" onClick={handleGoogleSignIn} />
            </div>
          </Form>
        </div>
        <div className="p-4 box card mt-3 text-center">
          <p className="mb-0">Already have an account? <Link to="/login">Log In</Link></p>
        </div>
      </AuthLayout>
    </AuthWrapper>
  )
}
  
export default Signup;