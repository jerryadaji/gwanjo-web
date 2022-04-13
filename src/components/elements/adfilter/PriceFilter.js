import PriceFieldCompact from "../PriceFieldCompact"
import { Box, Button, List, ListItem, ListItemButton, Typography } from '@mui/material';

const PriceFilter = ({ category, activeSubCategory }) => {
  return (
    <List sx={{ bgcolor: 'background.paper', mt: 2 }} >
      <ListItem>
        <Typography 
          color="disable" 
          fontSize="small"
          fontWeight="medium"
        >
          Price
        </Typography>
      </ListItem>
      <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
        <PriceFieldCompact label={"Min"}/>
        <Typography variant="body2" px={1}>-</Typography>
        <PriceFieldCompact label={"Max"}/>
      </ListItem>
      <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button 
          size="small"
          sx={{ 
            borderRadius: '1.5rem',
            textTransform: 'capitalize'
          }}
        >
          Clear
        </Button>
        <Button 
          variant="outlined" 
          size="small"
          sx={{ 
            borderRadius: '1.5rem',
            textTransform: 'capitalize'
          }}
        >
          Save
        </Button>
      </ListItem>
     
    </List>
  );
}

export default PriceFilter;