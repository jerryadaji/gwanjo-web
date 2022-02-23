import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import AuthLayout from "../layout/AuthLayout";

const  NewPassword = () => {
	const [password, setPassword] = useState("");
  const [error, setError] = useState("");  
  const [passwordReset, setPasswordReset] = useState("")

  const { changePassword } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try{
      await changePassword(password);
      setPasswordReset(true);
    } catch(err) {
      console.log(err)
      setError(err.message)
    }
  }

  if(!passwordReset){
    return(
      <AuthLayout>
        <div className="p-4 mt-5 box card">
          <h5 className="mb-4">Change Password</h5>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control 
                type="password" 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">Update Password</Button>
            </div> 
          </Form>
        </div>
        <div className="p-4 box card mt-3 text-center">
          <p className="mb-0">Return to <Link to="/dashboard">Dashboard</Link></p>
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
      <h5 className="mb-4">Password Updated</h5>
      <p className="mb-4">Click below to return to dashboard.</p>
      <p>Go to <Link to="/login">Dashboard</Link></p>
    </AuthLayout>
	)
}

export default NewPassword;