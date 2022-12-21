import Avatar from "@mui/material/Avatar";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { MenuButton } from "../../components/MenuButton/MenuButton";
import { BEM } from "../../tools";
import { mainColor } from "../../types/consts";
import "./style.css";

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

interface AdminHeaderProps {
  menuItems: any[];
}

export const AdminHeader = ({ menuItems }: AdminHeaderProps) => {
  const location = useLocation();
  const userName = useAppSelector((state: any) => state.user.userName);

  const cssClasses = {
    /* header class */
    header: "adminHeader",
    /* profil class */
    profil: "adminProfil",
    /* menu class */
    menu: "adminMenu",
    /* navigation class */
    nav: "adminNav",
    /* selected class */
    selected: "selected"
  };

  const getNavClasses = (element: any) => {
    let classes: string[] = [];
    classes.push(cssClasses.nav);
    if(element.to === location.pathname)
    {
      classes.push(BEM(cssClasses.header, null, cssClasses.selected));
    }
    return classes;
  }

  return (
    <div className={cssClasses.header}>
      <nav>
        <ul>
          {navList.map((element: any, i: number) => (
            <>
              <li key={i}>
                <Link key={i + 10} className={getNavClasses(element).join(" ")} to={element.to}>
                  {element.text}
                </Link>
              </li>
              {i !== navList.length - 1 && (
                <div className="adminLine" key={i + 10} />
              )}
            </>
          ))}
        </ul>
      </nav>
      <div className={cssClasses.profil}>
        <Avatar
          sx={{
            bgcolor: mainColor,
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          {userName ? userName.substring(0, 1) : null}
        </Avatar>
      </div>
      <div className={cssClasses.menu}>
        <MenuButton menuItems={menuItems} />
      </div>
    </div>
  );
};
