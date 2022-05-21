import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Alert, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { db } from "../../firebase"
import { useUserAuth } from "../../context/UserAuthContext";

import AppLayout from "../layout/AppLayout"
import PageNotFound from "../PageNotFound";
import Loader from "../Loader";
import PriceField from "../elements/PriceField";
import ImageUploader from "../imageUploader/ImageUploader";
import Locationfield from "../elements/LocationField";
import CategorySelector from "../elements/CategorySelector";
import RichTextEditor from "../richtextEditor/RichTextEditor";

const UserDetailsForm = ({redirectPath}) => {
  const [userData, setUserData] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(""); 

  const navigate = useNavigate();
  const { state } = useLocation();

  // Get signed in user
  let { user } = useUserAuth();

  // Get User information
  const getUser = async () =>{
    setEmail(user.email)

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      setFirstName(docSnap.data().firstName || "")
      setLastName(docSnap.data().lastName || "")
      setPhone(docSnap.data().phone || "")
      setWhatsApp(docSnap.data().whatsApp || "")
      setStatus(docSnap.data().status || "pending")
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }

  useEffect(() => {

    getUser()
  }, [])  

  // Update ad on form submission 
  const handleSubmit = async (e) => {
    e.preventDefault();    
    setError("");

    try {
      // Update user data
      const data = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        whatsApp: whatsApp,
        creationTime: user.metadata.creationTime,
        status: "complete"
      }

      await setDoc(doc(db, "users", user.uid), data);    
      window.location.replace( redirectPath || "/dashboard" );

    } catch (err) {
      setError("Something went wrong. Try again");
    }
  }

  // Render
  if( isLoading ){
    return (
      <AppLayout>
        <Loader/>
      </AppLayout>
    )
  } else {
    return(
      <AppLayout>
        <Container 
          disableGutters
          maxWidth="sm" 
        >
          <Paper sx={{mb: 2, p: 2}} variant="outlined">
            <Typography 
              component="h1" 
              mb={1}
              variant="h5" 
            >
              My Information 
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField 
                id="email" 
                type="text" 
                label="Email" 
                required
                disabled
                variant="outlined" 
                value={email}
                fullWidth
                margin="normal"
              />
              <TextField 
                id="firstName" 
                type="text" 
                label="First Name" 
                required
                variant="outlined" 
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                fullWidth
                margin="normal"
              />
              <TextField 
                id="lastName" 
                type="text" 
                label="Last Name" 
                required
                variant="outlined" 
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                fullWidth
                margin="normal"
              />
              <TextField 
                id="phone" 
                type="tel" 
                label="Phone Number" 
                required
                variant="outlined" 
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                fullWidth
                margin="normal"
              />
              <TextField 
                id="whatsApp" 
                type="tel" 
                label="WhatsApp Number" 
                variant="outlined" 
                onChange={(e) => setWhatsApp(e.target.value)}
                value={whatsApp}
                fullWidth
                margin="normal"
              />

              <Box mt={3} textAlign={"right"}>
                <Button 
                  sx={{ 
                    borderRadius: '1.5rem',
                    textTransform: 'capitalize'
                  }}
                  type="submit"
                  variant="contained"
                >
                  Save
                </Button>
              </Box> 
            </form>
          </Paper>
        </Container>
      </AppLayout>
    )
  }
}
export default UserDetailsForm;