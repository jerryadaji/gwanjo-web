import { useState } from 'react';
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
  const [deleteAction, setDeleteAction] = useState(false);
  const [location, setLocation] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    setOpen(false);
    console.log("New Location: " + location.region + ", saved.");
  };

  const updateLocation = () => {
    console.log("Loca")
  }

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
      in Porth Harcourt
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
          <Locationfield savedLocation={location} updateLocation={setLocation}/>
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