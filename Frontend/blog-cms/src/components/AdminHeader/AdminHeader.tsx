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
    /* navigation class */
    nav: "nav"
  };

  return (
    <div className={cssClasses.header}>
      <p className={cssClasses.nav}>Strona główna</p>
      <div className="line"/>
      <p className={cssClasses.nav}>Kategorie</p>
      <div className="line"/>
      <p className={cssClasses.nav}>Kontakt</p>
      <div className={cssClasses.profil}>
        <Avatar sx={{ bgcolor: "#00eadc", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>XD</Avatar>
      </div>
      <div className={cssClasses.menu}>
        <MenuButton menuItems={menuItems} />
      </div>
    </div>
  );
};