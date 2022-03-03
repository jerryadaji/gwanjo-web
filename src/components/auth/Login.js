import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Alert, Form } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import GoogleButton from "react-google-button";
import AuthLayout from "../layout/AuthLayout";
import AuthWrapper from "./AuthWrapper";

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const  Login = () => {
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const navigate = useNavigate();
  const { state } = useLocation();

  const { logIn, googleSignIn } = useUserAuth();

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
          <h1>Log In</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField 
              id="email-address" 
              type="email" 
              label="Email address" 
              variant="outlined" 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              fullWidth
              margin="normal"
            />
            <TextField 
              id="password" 
              type="password" 
              label="Password" 
              variant="outlined" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              fullWidth
              margin="normal"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                backgroundColor: '#44079c',
                borderRadius: '1.5rem',
                mt: 3, 
                mb: 2,
                textTransform: 'capitalize'
              }}
            >
              Sign In
            </Button>
            <div className="pt-3">
              <GoogleButton type="light" className="w-100" onClick={handleGoogleSignIn} />
            </div>
            <Grid container sx={{ mt: 3, mb: 2 }}>
              <Grid item xs>
                <Link to="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </AuthLayout>
    </AuthWrapper>
  )
  
}

export default Login;