import { useState } from "react";
import { useUserAuth } from "../../../context/UserAuthContext";

import { 
  Divider, IconButton, Link, Menu, MenuItem, MenuList 
} from '@mui/material';

import { AccountCircle } from '@mui/icons-material';


const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  let { logOut } = useUserAuth();
  
  const handleLogOut = async () =>{
    try{
      await logOut();
    }catch(err){
      console.log(err);
    }
  }

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>    
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <AccountCircle sx={{ fontSize: "1rem", width: 38, height: 38 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuList dense sx={{p: 0}}>
          <MenuItem>
            <Link href="/dashboard" color="text.primary">Dashboard</Link>
          </MenuItem>
          <Divider />
          <MenuItem>
            <Link href="/settings" color="text.primary">Settings</Link>
          </MenuItem>
          <MenuItem onClick={ handleLogOut }>Logout</MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default AccountMenu