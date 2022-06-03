import { useEffect, useState } from 'react';
import locationsData from '../../../data/locationsData';
import Locationfield from '../LocationField';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Alert, Box, Button, Card, CardContent, CardMedia, DialogTitle, IconButton, Typography} from '@mui/material';


import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useLocation, useNavigate } from 'react-router-dom';


const LocationModal = ({ action, data, image }) => {
  const [open, setOpen] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const [location, setLocation] = useState(
    JSON.parse(localStorage.getItem('location')) || false
  );

  const navigate = useNavigate();
  const currentLocation = useLocation();

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
    navigate( currentLocation.pathname );
    window.location.reload();
  };

  const Root = styled('div')(({ theme }) => ({
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    [theme.breakpoints.up('md')]: {
      padding: '0',
    },
  }));

  return(
   <>
    <Typography 
      aria-label="Delete ad"
      component="div"
      gutterBottom 
      onClick={handleClickOpen}
      variant="body2" 
      sx={{
        cursor: "pointer",
        fontWeight: "medium",
        mb: 0,
      }}
    >
      <Root>
        in {userLocation.region ?? "Nigeria"}
        <KeyboardArrowDownOutlinedIcon fontSize="inherit"/>
      </Root>
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