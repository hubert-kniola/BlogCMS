import React from "react";
import Avatar from "@mui/material/Avatar";
import { MenuButton } from "../../components/MenuButton/MenuButton";
import "./style.css";

interface AdminHeaderProps {
  menuItems: string[];
}

export const AdminHeader = ({ menuItems }: AdminHeaderProps) => {
  const cssClasses = {
    /* header class */
    header: "header",
    /* profil class */
    profil: "profil",
    /* menu class */
    menu: "menu",
  };

  return (
    <div className={cssClasses.header}>
      <p>Panel administracyjny</p>
      <div className={cssClasses.profil}>
        <Avatar sx={{ bgcolor: "#00eadc" }}>XD</Avatar>
      </div>
      <div className={cssClasses.menu}>
        <MenuButton menuItems={menuItems} />
      </div>
    </div>
  );
};