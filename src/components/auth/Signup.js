import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../firebase"
import GoogleButton from "react-google-button";
import AuthLayout from "../layout/AuthLayout";
import AuthWrapper from "./AuthWrapper";

import { 
  Alert, Card, CardContent, Box, Button, Checkbox, Divider, FormControlLabel, Grid, Link, TextField, Typography 
} from '@mui/material';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");  

  const navigate = useNavigate()

  const { signUp, googleSignIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if(password !== confirmPassword){
      setError("Passwords do not match")
      return;
    }

    if(!terms){
      setError("You must accept the terms to continue")
      return;
    }

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
        <Card>
          <CardContent sx={{ p: "1.5rem"}}>
            <Typography variant="h5" mb={2} component="h1">Sign Up</Typography>
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
              <TextField 
                id="confirmPassword" 
                type="password" 
                label="Confirm Password" 
                variant="outlined" 
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                fullWidth
                margin="normal"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={terms} 
                    onChange={(e) => setTerms(e.target.checked)} 
                    color="primary" 
                  />
                }
                label="I agree to the terms & privacy policy"
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
                Sign Up
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
              <Box container sx={{ mt: 4 }}>
                <Typography component="span" variant="body2">Already have an account? </Typography>
                <Link href="/login" variant="body2">Sign In</Link>
              </Box>
            </form>
          </CardContent>
        </Card>
      </AuthLayout>
    </AuthWrapper>
  )
}
  
export default Signup;