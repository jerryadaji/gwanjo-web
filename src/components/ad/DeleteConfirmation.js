import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Alert, Box, Button, Card, CardContent, CardMedia, DialogTitle, IconButton, Typography} from '@mui/material';


import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';


const DeleteConfirmation = ({ action, data, image }) => {
  const [open, setOpen] = useState(false);
  const [deleteAction, setDeleteAction] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    setOpen(false);
    action();
  };

  return(
   <>
     <IconButton 
      aria-label="Delete ad"
      onClick={handleClickOpen}
    >
      <DeleteOutlineOutlinedIcon fontSize="small" />
    </IconButton>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"xs"}
    >
        <DialogTitle id="alert-dialog-title" fontSize="medium">
          {"Are you sure you want to delete this Ad?"}
        </DialogTitle>
        <DialogContent>
          <Card variant="outlined" sx={{ display: 'flex', mb: 3 }}>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={image}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography 
                  gutterBottom 
                  variant="body1" 
                  component="p"
                  sx={{ color: "text.primary" }}
                >{data.title}</Typography>
                <Typography 
                  variant="subtitle2" 
                  color="primary"
                >₦25,000</Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  component="div"
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    mt: 1
                  }}
                >
                  <LocationOnOutlinedIcon fontSize="inherit"/>
                  Abuja
                </Typography>
              </CardContent>
            </Box>
          </Card>
          <Alert severity="warning">You can not undo this action.</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ textTransform: 'capitalize' }}>Cancel</Button>
          <Button 
            autoFocus
            color="error" 
            disableElevation
            onClick={handleAction} 
            sx={{ 
              borderRadius: '1.5rem',
              textTransform: 'capitalize'
            }}
            variant="contained" 
          >
            Delete Ad
          </Button>
        </DialogActions>
      </Dialog>
   </>
  )
}
export default DeleteConfirmation;