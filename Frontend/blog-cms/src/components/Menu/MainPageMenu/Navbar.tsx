import React from "react"
import { BEM } from "../../../tools";
import { MenuItemType } from "../../../types"
import { css } from "./cssBem";
import { MenuItems } from "./MenuItems"
import "./style.css"

const menu: MenuItemType[] = [
  { title: "Home", url: "/" },
  {
    title: "Services",
    url: "/services",
    subMenu: [
      { title: "web design", url: "/web-design" },
      { 
        title: "web development", 
        url: "/web-dev", 
        subMenu: [
            { 
                title: "Backend", 
                url: "/b-end", 
                subMenu:[
                    { title: ".NET", url: "/dotnet" },
                    { title: "Python", url: "/python" },
            ]},
            { title: "Frontend", url: "/f-end" },
        ] },
      { title: "SEO", url: "/seo" },
    ],
  },
  { title: "About", url: "/aboutme" },
  { title: "Contact", url: "/contact" },

];

export const Navbar = () => {
    const depthLvl = 0
    return (
        <nav>
            <ul className={BEM(css.nav, css.menu)}>
                {menu.map((item, i) => {
                    return (
                    <MenuItems item={item} key={i} depthLvl={depthLvl}/>
                    );
                })}
            </ul>
        </nav>
    )
}