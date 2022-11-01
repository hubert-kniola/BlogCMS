import React from "react";
import { BEM } from "../../../tools";
import { MenuItemType } from "../../../types";
import { css } from "./cssBem";
import { MenuItems } from "./MenuItems";

interface IDropdown  {
    items: MenuItemType[]
    dropdown: boolean 
    depthLvl: number
}

export const Dropdown= ({items, dropdown, depthLvl} : IDropdown) => {
  depthLvl = depthLvl+1;
  const dropdownClass = depthLvl > 1 && BEM(css.nav, css.dropdown, css.modifiers.submenu);
  return (
    <ul
      className={`${BEM(css.nav, css.dropdown)} ${dropdownClass} ${
        dropdown && BEM(css.nav, css.dropdown, css.modifiers.show)
      }`}
    >
      {items.map((item, i) => {
        return <MenuItems item={item} key={i} depthLvl={depthLvl} />;
      })}
    </ul>
  );
}    