import PriceFieldCompact from "../PriceFieldCompact"
import { Box, Button, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PriceFilter = ({ category, activeSubCategory }) => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setMin( searchParams.get("min") || "" )
    setMax( searchParams.get("max") || "" )
  },[searchParams])

  const handleClear = () => {
    navigate(location.pathname);
    window.location.reload();
  }
  
  const handleSubmit = () => {
    let url = `
      ${location.pathname} ?
      ${ min ? ( "min=" + min) : ""}
      ${ min && max ? "&" : "" }
      ${ max ? ( "max=" + max) : ""}
    `

    url = url.replace(/\s+/g, '')

    navigate(url);
    window.location.reload();
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