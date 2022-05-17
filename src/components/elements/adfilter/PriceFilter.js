import PriceFieldCompact from "../PriceFieldCompact"
import { Button, List, ListItem, Typography } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { QueryStringContext } from "../../../context/QuerString";

const PriceFilter = ({ category, activeSubCategory }) => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  // Get Query String argument from Context
  const [filterQuery, setFilterQuery] = useContext(QueryStringContext)
 
  // Set Query String argument state
  useEffect(() => {
    setMin( filterQuery.min )
    setMax( filterQuery.max )
  },[filterQuery])

  // Clear Price Filter
  const handleClear = () => {
    setFilterQuery(prev => ({...prev, min: '', max: ''}))
  }
  
  // Set Price Filter
  const handleSubmit = () => {
    setFilterQuery(prev => ({...prev, min: min, max: max}))
  }

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
        <PriceFieldCompact 
          label={"Min"}
          price={min} 
          setPrice={setMin}
        />
        <Typography variant="body2" px={1}>-</Typography>
        <PriceFieldCompact
          label={"Max"}
          price={max} 
          setPrice={setMax}
        />
      </ListItem>
      <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button 
          onClick={handleClear}
          size="small"
          sx={{ 
            borderRadius: '1.5rem',
            textTransform: 'capitalize'
          }}
        >
          Clear
        </Button>
        <Button 
          onClick={handleSubmit}
          size="small"
          sx={{ 
            borderRadius: '1.5rem',
            textTransform: 'capitalize'
          }}
          variant="outlined" 
        >
          Save
        </Button>
      </ListItem>
     
    </List>
  );
}

export default PriceFilter;