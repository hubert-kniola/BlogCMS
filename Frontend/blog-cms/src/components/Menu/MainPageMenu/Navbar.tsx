import React from "react";
import { BEM } from "../../../tools";
import { MenuItemType } from "../../../types";
import { css } from "./cssBem";
import { MenuItems } from "./MenuItems";
import "./style.css";

const menu: MenuItemType[] = [
  {
    title: "Services",
    path: "/services",
    subMenu: [
      { title: "web design", path: "/web-design" },
      {
        title: "web development",
        path: "/web-dev",
        subMenu: [
          {
            title: "Backend",
            path: "/b-end",
            subMenu: [
              { title: ".NET", path: "/dotnet" },
              { title: "Python", path: "/python" },
            ],
          },
          { title: "Frontend", path: "/f-end" },
        ],
      },
      { title: "SEO", path: "/seo" },
    ],
  },
  { title: "About", path: "/aboutme" },
  { title: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const depthLvl = 0;
  return (
    <nav>
      <ul className={BEM(css.nav, css.menu)}>
        {menu.map((item, i) => {
          return <MenuItems item={item} key={i} depthLvl={depthLvl} />;
        })}
      </ul>
    </nav>
  );
};
