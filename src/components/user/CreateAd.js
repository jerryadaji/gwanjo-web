import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

import { collection, addDoc, setDoc } from "firebase/firestore"; 
import { db } from "../../firebase";
import { useUserAuth } from "../../context/UserAuthContext";

import AppLayout from "../layout/AppLayout"
import PriceField from "../elements/PriceField";
import Locationfield from "../elements/LocationField";
import CategorySelector from "../elements/CategorySelector";
import RichTextEditor from "../richtextEditor/RichTextEditor";
import ImageUploader from "../imageUploader/ImageUploader";


const CreateAd = () => {
  const [adId, setAdId] = useState(""); 
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); 
  const [formState, setFormState] = useState("edit"); 

  const navigate = useNavigate();

  let { user } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();    
    setError("");

    try {
      const docRef = await addDoc(collection(db, "ads"), {
        uid: user.uid,
        title: title,
        price: price,
        location: location,
        category: category,
        subCategory: subCategory,
        description: description
      });
      setAdId(docRef.id);
      setFormState("upload");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  }

    // Redirect to dashboard if form submission is complete
    useEffect(() => {
      if(formState === "complete"){
        navigate("/dashboard");
      }
    }, [formState]) 

  const updateFormState = newFormState => setFormState(newFormState)
  const updateLocation = getLocationtion => setLocation(getLocationtion)
  const updateDescription = getDescription => setDescription(getDescription)

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
            Create Ad 
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField 
              autoFocus
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
            <Locationfield updateLocation={updateLocation}/>
            <CategorySelector 
              category={category} 
              setCategory={setCategory}
              subCategory={subCategory} 
              setSubCategory={setSubCategory}
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
            <RichTextEditor updateDescription={updateDescription}/>
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
                Create Ad
              </Button>
            </Box> 
          </form>
        </Paper>
      </Container>
    </AppLayout>
  )
}
export default CreateAd