import { Grid, Paper } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const AddIcon = ({count}) => {
  return(
    <Grid 
      item 
      xs={3} 
      md={2}
      sx={{ display: "flex" }}
    >
      <Paper
        sx={{ 
          alignItems: "center",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          p: 2,
          textAlign: "center"
        }}
        variant="outlined"
      >
        <AddOutlinedIcon 
          color="disabled" 
          fontSize="large"
        />
      </Paper>
    </Grid>

  )
}

export default AddIcon;