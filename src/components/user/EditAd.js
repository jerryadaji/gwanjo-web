import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Alert, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { db } from "../../firebase"
import { useUserAuth } from "../../context/UserAuthContext";

import AppLayout from "../layout/AppLayout"
import PageNotFound from "../PageNotFound";
import Loader from "../Loader";
import PriceField from "../elements/PriceField";
import RichTextEditor from "../richtextEditor/RichTextEditor";
import ImageUploader from "../imageUploader/ImageUploader";


const EditAd = () => {
  const [ad, setAd] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); 
  const [formState, setFormState] = useState("edit"); 

  const navigate = useNavigate();

  // Get signed in user
  let { user } = useUserAuth();

  // Get Ad ID from URL
  const { adId } = useParams();

  // Get Ad information
  useEffect(() => {
    const getAd = async () =>{
      const docRef = doc(db, "ads", adId);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        setTitle(docSnap.data().title)
        setPrice(docSnap.data().price)
        setDescription(docSnap.data().description)
        setAd({id: docSnap.id, ...docSnap.data()})
      }else{
        setAd(null)
      }
    }

    getAd()
  }, [])  

  // Redirect to dashboard if form submission is complete
  useEffect(() => {
    if(formState === "complete"){
      navigate("/dashboard");
    }
  }, [formState]) 

  // Update ad on form submission 
  const handleSubmit = async (e) => {
    e.preventDefault();    
    setError("");

    try {
      // Get document reference
      const adRef = doc(db, "ads", adId);

      // Update document
      await updateDoc(adRef, {
        title: title,
        price: price,
        description: description
      }).then(() => setFormState("upload") );

    } catch (err) {
      setError("Something went wrong. Try again");
    }
  }

  const updateFormState = newFormState => setFormState(newFormState)
  const updateDescription = getDescription => setDescription(getDescription)

  // Render
  if( ad === "" ){
    return (
      <AppLayout>
        <Loader/>
      </AppLayout>
    )
  }else if(ad === null || ad.uid !== user.uid){
    return(
      <PageNotFound/>
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
              Edit your Ad 
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField 
                id="title" 
                type="text" 
                label="Title" 
                required
                variant="outlined" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                fullWidth
                margin="normal"
              />
              <PriceField 
                price={price}
                setPrice={setPrice}
              />
              <Typography 
                color="text.secondary"
                component="p"
                fontWeight={"medium"}
                mb={1}
                mt={2}
                variant="body1" 
              >
                Describe what you are selling
              </Typography>
              <RichTextEditor value={description} updateDescription={updateDescription}/>
              <ImageUploader 
                adId={adId}
                formState={formState} 
                updateFormState={updateFormState}
              />
              <Box mt={3} textAlign={"right"}>
                <Button 
                  sx={{ 
                    borderRadius: '1.5rem',
                    textTransform: 'capitalize'
                  }}
                  type="submit"
                  variant="contained"
                  disabled={ (formState === "upload") ? true : false }
                >
                  Update Ad
                </Button>
              </Box> 
            </form>
          </Paper>
        </Container>
      </AppLayout>
    )
  }
}
export default EditAd;