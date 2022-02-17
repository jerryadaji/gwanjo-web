import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import AuthLayout from "../layout/AuthLayout";

const  ForgotPassword = () => {
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
}

export default ForgotPassword;