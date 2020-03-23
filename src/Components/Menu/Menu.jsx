import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Anchor = {vertical: 'bottom',horizontal: 'center'};

const TransForm = {vertical: 'top',horizontal: 'center'};

export default function SimpleMenu({menu = [],Icon}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick} size="small" color="inherit">
            {Icon}
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={Anchor}
        transformOrigin={TransForm}
        open={Boolean(anchorEl)}
        onClose={handleClose}>            
          {
            menu.map(data => 
              <MenuItem 
              // disableGutters={true} dense={true}
              >{data.Component}</MenuItem>
          )}                                          
      </Menu>
    </div>
  );
}