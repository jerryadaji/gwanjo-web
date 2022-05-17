import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytesResumable } from "firebase/storage";

import { Alert, Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EmptyState from "./EmptyState";
import Preview from "./Preview";
import AddButton from "./AddButton";

const ImageUploader = ({ formState, updateFormState, adId }) => {
  const [images, setImages] = useState([]);
  const [cloudImages, setCloudImages] = useState([]);
  const [cloudRefPaths, setCloudRefPaths] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState("");

  /* 
  *************************************************************************************
  * LISTEN FOR PARENT FORM STATUS
  *************************************************************************************
  */
  useEffect(() => {
    if(formState === "upload"){
      handleUpload()
    }
  }, [formState]);

  /* 
  *************************************************************************************
  * GET CLOUD FILES
  *************************************************************************************
  */
  const storage = getStorage();
  const listRef = ref(storage, 'images/' + adId);
  
  useEffect(() => {
    // Find all the prefixes and items.
    listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef, index) => {
        // Save all refs
        setCloudRefPaths(prev => [...prev, {id: index, path: itemRef.fullPath}])

        // Extract URLs from ref
        getDownloadURL(itemRef)
          .then((url) => {
            setCloudImages(prev => [...prev, {id: index, url: url, uploadProgress: 0}])
          })
          .catch((error) => {
            setError("Something went wrong. Try again.")
          });
      }
    );
    }).catch((error) => {
      setError("Something went wrong. Try again.")
    });
  }, [adId])  


  /* 
  *************************************************************************************
  * LISTEN FOR FILE SELECTION
  *************************************************************************************
  */
  // User file selection event
  const onImageChange = (e) => {
    setImages(prev => {
      return [...prev, ...e.target.files]
    })
  }

  // Load local image URLs
  useEffect(() => {
    const newImageUrls = [];
    images.forEach(image => newImageUrls.push({url: URL.createObjectURL(image), uploadProgress: 0}))
    setImageUrls(newImageUrls)
    
  }, [images]);

  /* 
  *************************************************************************************
  * FILE UPLOAD
  *************************************************************************************
  */
  // Create the file metadata
  const metadata = {
    contentType: 'image/jpeg'
  };

  // Upload local images
  const handleUpload = () => {
    // Set form state to upload
    updateFormState("upload")

    const promises = [];

    images.map((image, index) => {
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, 'images/' + adId + "/" + image.name);
      const uploadTask = uploadBytesResumable(storageRef, image, metadata);

      promises.push(uploadTask);
      uploadTask.on("state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          const updateUrls = [...imageUrls];
          updateUrls[index].uploadProgress = progress;

          setImageUrls(updateUrls);
        },
        (error) => {
          setError("Something went wrong with adding images. Try again.")
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateFormState("upload_complete")
          });
        }
      );
    });

    Promise.all(promises)
      .then(() => updateFormState("complete"))
      .catch((err) => setError("Something went wrong with adding images. Try again."));
  };

  /* 
  *************************************************************************************
  * REMOVING FILES
  *************************************************************************************
  */
  // Remove cloud images
  const cloudRemove = id => {
    // Create a reference to the file to delete
    const result = cloudRefPaths.filter(path =>  (path.id === id));

    const desertRef = ref(storage, result[0].path);

    // Delete the file
    deleteObject(desertRef).then(() => {
      const updatedCloudImages = cloudImages.filter( cloudImage => cloudImage.id !== id );
      setCloudImages(updatedCloudImages)
    }).catch((error) => {
      setError("Something went wrong with removing the image. Try again.")
    });
    
  }

  // Remove local images
  const remove = id => {
    const imageList = [...images];
    imageList.splice(id, 1);
    setImages(imageList)
  }

  /* 
  *************************************************************************************
  * RENDER
  *************************************************************************************
  */
  return(
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
          mt: 2
        }}
      >

        <Typography 
          color="text.secondary"
          component="p"
          fontWeight={"medium"}
          variant="body1" 
          >
          Add images
        </Typography>
        <Typography 
          color="text.secondary"
          component="p"
          fontWeight={"medium"}
          
          variant="caption" 
          >
          {(images.length + cloudImages.length) + "/10"}
        </Typography>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        border={"1px solid #D8D8D8"}
        borderRadius="2px"
        p={1}
      >
        <Grid container position={"relative"} spacing={1}>
          { 
            // Show cloud images
            cloudImages.map( (cloudImage, index) =>  {
              return <Preview 
                        id={cloudImage.id} 
                        image={cloudImage} 
                        key={cloudImage.id} 
                        remove={cloudRemove} 
                        sx={{ position: "relative", zIndex: "tooltip"}} 
                      /> 
            }) 
          }
          { 
            // Show selected images
            imageUrls.map( (image, index) =>  {
              return <Preview 
                        id={index} 
                        image={image} 
                        key={index} 
                        remove={remove} 
                        sx={{ position: "relative", zIndex: "tooltip"}} 
                      /> 
            }) 
          }
          { ( (imageUrls.length > 0 || cloudImages.length > 0) && imageUrls.length + cloudImages.length < 10 ) ? <AddButton /> : "" }
          { (!imageUrls.length && !cloudImages.length) && <EmptyState sx={{position: "relative", zIndex: "0"}} /> }
          { (imageUrls.length + cloudImages.length < 10) &&
            <input 
              multiple accept="image/*" 
              onChange={onImageChange} 
              style={{
                cursor: "pointer",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0,
                zIndex: "1"
              }}
              type="file" 
            />
          }
        </Grid>
      </Box>
    </Box>
  )
}

export default ImageUploader