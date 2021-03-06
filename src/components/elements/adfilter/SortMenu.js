import { useContext, useEffect, useState } from 'react';
import { Button, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography } from '@mui/material';
import Check from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { QueryStringContext } from '../../../context/QuerString';

const SortMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("date_published")

  // Get Query String argument from Context
  const [filterQuery, setFilterQuery] = useContext(QueryStringContext)

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const values = { 
    date_published: "Date Published" ,
    price_low_to_high: "Price Low to High",
    price_high_to_low: "Price High to Low" 
  }

  useEffect(() => {
    if( filterQuery.sort ){
      setValue( filterQuery.sort )
    }
  },[filterQuery])
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleSelection = (newValue) => {
    setAnchorEl(null);
    setFilterQuery(prev => ({...prev, sort: newValue }))
  };

  const showLabel = () => {
    return values[value]
  }

  return (
    <>
      <Button
        id="sort-button"
        aria-controls={open ? 'sort-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="small"
        sx={{
          borderRadius: '1.5rem',
        }}
        variant="outlined"
      >
        <Typography 
          variant='body2'
          sx={{
            fontWeight: "medium",
            pr: 1,
            textTransform: "capitalize",
          }}
        >
          Sort By: 
        </Typography>
        <Typography
          variant='body2'
          sx={{
            pr: 1,
            textTransform: "capitalize"
          }}
        >
          { showLabel() }
        </Typography>
        <ExpandMoreIcon/>
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'sort-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuList dense sx={{p: 0}}>
          <MenuItem onClick={() => handleSelection("date_published")}>
            { value === "date_published" &&
              <>
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
                Date Published
              </>
            }
            { value !== "date_published" && <ListItemText inset>Date Published</ListItemText> }
          </MenuItem>
          <MenuItem onClick={() => handleSelection("price_low_to_high")}>
            { value === "price_low_to_high" &&
              <>
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
                Price: Low to High
              </>
            }
            { value !== "price_low_to_high" && <ListItemText inset>Price: Low to High</ListItemText> }
          </MenuItem>
          <MenuItem onClick={() => handleSelection("price_high_to_low")}>
            { value === "price_high_to_low" &&
              <>
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
                Price: High to Low
              </>
            }
            { value !== "price_high_to_low" && <ListItemText inset>Price: High to Low</ListItemText> }
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default SortMenu;