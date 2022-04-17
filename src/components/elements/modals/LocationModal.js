import { useEffect, useState } from 'react';
import locationsData from '../../../data/locationsData';
import Locationfield from '../LocationField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Alert, Box, Button, Card, CardContent, CardMedia, DialogTitle, IconButton, Typography} from '@mui/material';


import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';


const LocationModal = ({ action, data, image }) => {
  const [open, setOpen] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const [location, setLocation] = useState(
    JSON.parse(localStorage.getItem('location')) || false
  );

  useEffect(() => {
    setUserLocation( JSON.parse(localStorage.getItem('location')) || "" )
  }, [open])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    const saveLocation = {
      id: location.id,
      state: location.state, 
      region: location.region
    }
    
    localStorage.setItem('location', JSON.stringify(saveLocation));
    setOpen(false);
  };

  return(
   <>
    <Typography 
      aria-label="Delete ad"
      component="div"
      gutterBottom 
      onClick={handleClickOpen}
      variant="body2" 
      sx={{
        alignItems: "center",
        cursor: "pointer",
        display: "flex",
        fontWeight: "medium",
        mb: 0,
      }}
    >
      in {userLocation.region ?? "Nigeria"}
      <KeyboardArrowDownOutlinedIcon fontSize="inherit"/>
    </Typography>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"xs"}
    >
        <DialogTitle id="alert-dialog-title" fontSize="medium">
          {"Choose your location"}
        </DialogTitle>
        <DialogContent>
        <Typography 
          variant="caption" 
          color="text.secondary"
          component="p"
          sx={{
            alignItems: "center",
            display: "flex",
            mb: 1
          }}
        >
          Start typing to find your location. Your search results will be from this location
        </Typography>
          <Locationfield savedLocation={{state: location.state, region: location.id}} updateLocation={setLocation}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ textTransform: 'capitalize' }}>Cancel</Button>
          <Button 
            autoFocus
            color="primary" 
            disableElevation
            onClick={handleAction} 
            sx={{ 
              borderRadius: '1.5rem',
              textTransform: 'capitalize'
            }}
            variant="contained" 
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
   </>
  )
}

export default LocationModal;