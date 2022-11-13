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
  const userName = useAppSelector((state: any) => state.user.userName);

  const cssClasses = {
    /* header class */
    header: "header",
    /* profil class */
    profil: "profil",
    /* menu class */
    menu: "menu",
    /* navigation class */
    nav: "nav",
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
                <Link className={cssClasses.nav} to={element.to}>
                  {element.text}
                </Link>
              </li>
              {i !== navList.length - 1 && <div className="line" />}
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
          {userName}
        </Avatar>
      </div>
      <div className={cssClasses.menu}>
        <MenuButton menuItems={menuItems} />
      </div>
    </div>
  );
};
