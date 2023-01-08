import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_CATEGORY_OBJECT } from "../../../apollo/apolloQueries";
import { BEM } from "../../../tools";
import { CategoryType } from "../../../types";
import { css } from "./cssBem";
import { MenuItems } from "./MenuItems";
import "./style.css";

export const Navbar = () => {
  const {
    loading: loadingData,
    error: errorData,
    data: categoryData,
  } = useQuery(GET_CATEGORY_OBJECT);
  const [menu, setMenu] = useState(undefined as CategoryType[]);

  const getMenuItemData = (data: any): CategoryType[] => {
    return data?.category;
  };

  useEffect(() => {
    if (!loadingData) {
      setMenu([...getMenuItemData(categoryData)]);
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
