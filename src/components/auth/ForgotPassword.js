import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import AuthLayout from "../layout/AuthLayout";
import AuthWrapper from "./AuthWrapper";

const  ForgotPassword = () => {
	const [email, setEmail] = useState("");
  const [error, setError] = useState("");  
  const [emailSent, setEmailSent] = useState("")

  const { passwordResetEmail} = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try{
      await passwordResetEmail(email);
      setEmailSent(true);
    } catch(err) {
      setError(err.message)
    }
  }

  if(!emailSent){
    return(
      <AuthLayout>
        <div className="p-4 mt-5 box card">
          <h5 className="mb-4">Forgot Password</h5>
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
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">Reset Password</Button>
            </div> 
          </Form>
        </div>
        <div className="p-4 box card mt-3 text-center">
          <p className="mb-0">Remembered your password? <Link to="/login">Log In</Link></p>
        </div>
      </AuthLayout>
    )
  } else {
    return <PasswordResetConfirmation/>
  }
}

const  PasswordResetConfirmation = () => {
  return(
    <AuthLayout className="text-center">
      <h5 className="mb-4">Password Reset Request Sent</h5>
      <p>A password reset message was sent to ypur email address. Please click the link in that message ro reset your password.</p>
      <p className="mb-4">If you do not receive the password reset message within a few moments, please check your spam folder or other filtering tools.</p>
      <p>Remembered your password? <Link to="/login">Login</Link></p>
    </AuthLayout>
	)
}

export default ForgotPassword;