import { useState } from "react";
import { Alert, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../firebase"
import { useUserAuth } from "../../context/UserAuthContext";




import AppLayout from "../layout/AppLayout"
import RichTextEditor from "../richtextEditor/RichTextEditor";
import { ButtonBase } from "@mui/material";
import ImageUploader from "../imageUploader/ImageUploader";


const CreateAd = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); 

  let { user } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const docRef = await addDoc(collection(db, "ads"), {
        uid: user.uid,
        title: title,
        description: description
      });
      console.log("Document written with ID: ", docRef.id);
      //navigate(state?.redirectPath || "/dashboard");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  }

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
              id="title" 
              type="text" 
              label="Title" 
              variant="outlined" 
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              fullWidth
              margin="normal"
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

            <Box mt={3} textAlign={"right"}>
              <Button 
                sx={{ 
                  borderRadius: '1.5rem',
                  textTransform: 'capitalize'
                }}
                variant="contained"
              >
                Post Ad
              </Button>
            </Box> 
          </form>
        </Paper>
        <Paper sx={{p: 2}} variant="outlined">
          <Typography 
            component="h1" 
            mb={1}
            variant="h5" 
          >
            Images
          </Typography>
          <ImageUploader/>
        </Paper>
      </Container>
    </AppLayout>
  )
}
export default CreateAd