import React from "react";
import Avatar from "@mui/material/Avatar";
import { MenuButton } from "../../components/MenuButton/MenuButton";
import "./style.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Category from "../Category/Category";
import { useAppSelector } from "../../../store/hooks";
import { UserState } from "../../../store/slices/userSlice";

interface AdminHeaderProps {
  menuItems: any[];
}

export const AdminHeader = ({ menuItems }: AdminHeaderProps) => {
  const userName = useAppSelector((state: any) => state.user.userName)

  const cssClasses = {
    /* header class */
    header: "adminHeader",
    /* profil class */
    profil: "adminProfil",
    /* menu class */
    menu: "adminMenu",
    /* navigation class */
    nav: "adminNav",
  };

  const navList = [
    { to: "/admin", text: "Strona główna" },
    {
      to: "/admin/category",
      text: "Kategorie",
    },
    {
      to: "/admin/posts",
      text: "Posty",
    },
    {
      to: "/admin/about",
      text: "O mnie",
    },
    {
      to: "/admin/contact",
      text: "Kontakt",
    },
  ];

  return (
    <div className={cssClasses.header}>
      <nav>
        <ul>
          {navList.map((element: any, i: number) => (
            <>
              <li key={i}>
                <Link key={i+10} className={cssClasses.nav} to={element.to}>
                  {element.text}
                </Link>
              </li>
              {i !== navList.length - 1 && <div className="adminLine" key={i+10}/>}
            </>
          ))}
        </ul>
      </nav>
      <div className={cssClasses.profil}>
        <Avatar
          sx={{
            bgcolor: "#00eadc",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          {userName.substring(0,1)}
        </Avatar>
      </div>
      <div className={cssClasses.menu}>
        <MenuButton menuItems={menuItems} />
      </div>
    </div>
  );
};
