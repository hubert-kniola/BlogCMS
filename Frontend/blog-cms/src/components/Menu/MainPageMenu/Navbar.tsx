import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_MENU } from "../../../apollo/apolloQueries";
import { basicMenu } from "../../../settings";
import { BEM } from "../../../tools";
import { MenuItemType } from "../../../types";
import { css } from "./cssBem";
import { MenuItems } from "./MenuItems";
import "./style.css";

export const Navbar = () => {
  const {
    loading: loadingData,
    error: errorData,
    data: menuItemData,
  } = useQuery(GET_MENU);
  const [menu, setMenu] = useState(undefined as MenuItemType[]);

  const getMenuItemData = (data: any): MenuItemType => {
    return data?.menuItem;
  };

  useEffect(() => {
    if (!loadingData) {
      setMenu([getMenuItemData(menuItemData), ...basicMenu]);
    }
  }, [loadingData]);

  const depthLvl = 0;
  return (
    <nav>
      <ul className={BEM(css.nav, css.menu)}>
        {menu &&
          menu.map((item, i) => {
            return <MenuItems item={item} key={i} depthLvl={depthLvl} />;
          })}
      </ul>
    </nav>
  );
};
