import React, { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import AuthLayout from "../layout/AuthLayout";
import AuthWrapper from "./AuthWrapper";

import { 
  Alert, Card, CardContent, Box, Button, Link, TextField, Typography 
} from '@mui/material';
import mailSent from "../../images/icons/mail_sent.png"

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
      <AuthWrapper>
        <AuthLayout>
        <Card>
          <CardContent sx={{ p: "1.5rem"}}>
            <Typography variant="h5" mb={2} component="h1">Reset Password</Typography>
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
              >Reset Password</Button>
              <Box container sx={{ mt: 4 }}>
                <Typography component="span" variant="body2">Remembered your password? </Typography>
                <Link href="/login" variant="body2">Sign In</Link>
              </Box>
            </form>
          </CardContent>
          </Card>
        </AuthLayout>
      </AuthWrapper>
    )
  } else {
    return <PasswordResetConfirmation/>
  }
}

const  PasswordResetConfirmation = () => {
  return(
    <AuthWrapper>
      <AuthLayout>
        <Box sx={{textAlign: "center"}}>
          <img src={mailSent} alt="Mail sent" height={150} />
          <Typography variant="h6" mb={2} component="h1">Password Reset Request Sent</Typography>
          <Typography variant="body2" mb={2} component="p">A password reset message was sent to your email address. Please click the link in that message ro reset your password.</Typography>
          <Typography variant="body2" mb={2} component="p">If you do not receive the password reset message within a few moments, please check your spam folder or other filtering tools.</Typography>
          <Typography variant="subtitle2" mb={2} component="p">Remembered your password? <Link href="/login">Login</Link></Typography>
        </Box>
      </AuthLayout>
    </AuthWrapper>
	)
}

export default ForgotPassword;