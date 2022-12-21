import React, { useState } from "react";
import "./style.css";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { mainColor } from "../../types/consts";

interface MenuButtonProps {
  menuItems: string[];
}

export const MenuButton = ({ menuItems }: MenuButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color="primary" onClick={handleClick} size="large">
        <MenuIcon fontSize="large" sx={{ color: mainColor }} />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {menuItems.map((e: any, i: number) => (
          <MenuItem onClick={e.method} key={i}>
            {e.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
