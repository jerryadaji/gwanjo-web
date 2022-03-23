import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import GoogleButton from "react-google-button";
import AuthLayout from "../layout/AuthLayout";
import AuthWrapper from "./AuthWrapper";

import { 
  Alert, Card, CardContent, Box, Button, Checkbox, Divider, FormControlLabel, Grid, Link, TextField, Typography 
} from '@mui/material';

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
      console.log(err.code)
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
        <Card>
          <CardContent sx={{ p: "1.5rem"}}>
            <Typography variant="h5" mb={2} component="h1">Sign In</Typography>
            {error && <Alert severity="error">{error}</Alert>}
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
                  borderRadius: '1.5rem',
                  mt: 3, 
                  mb: 1,
                  textTransform: 'capitalize'
                }}
              >
                Sign In
              </Button>
              <Box
                sx={{ 
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Divider sx={{ flex: 1 }} />
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  component="p"
                  sx={{
                    m: 0,
                    p: 1
                  }}
                >OR</Typography>
                <Divider sx={{ flex: 1 }} />
              </Box>
              
              <Box
                sx={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 1
                }}
              >
                <GoogleButton type="light" className="google-button" onClick={handleGoogleSignIn} />
              </Box>
              <Grid container sx={{ mt: 4 }}>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Typography component="span" variant="body2">Don't have an account? </Typography>
                  <Link href="/signup" variant="body2">Sign Up</Link>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </AuthLayout>
    </AuthWrapper>
  )
  
}

export default Login;