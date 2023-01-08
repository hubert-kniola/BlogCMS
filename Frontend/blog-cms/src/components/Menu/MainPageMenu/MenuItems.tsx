import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { BEM } from "../../../tools";
import { CategoryType } from "../../../types";
import { css } from "./cssBem";
import { Dropdown } from "./Dropdown";

interface IMenuItem {
  item: CategoryType;
  depthLvl: number;
}

export const MenuItems = ({ item, depthLvl }: IMenuItem) => {
  const [dropdown, setDropdown] = useState(false);
  let ref: MutableRefObject<HTMLLIElement> = useRef();

  const onMouseEnter = () => {
    // window.innerWidth > 960 && setDropdown(true);
    window.innerWidth > 600 && setDropdown(true);
  };

  const onMouseLeave = () => {
    // window.innerWidth > 960 && setDropdown(false);
    window.innerWidth > 600 && setDropdown(false);
  };

  useEffect(() => {
    const handler = (event: any) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const hasSubMenu = item?.subCategory?.length > 0;

  return (
    <li
      className={BEM(css.nav, css.item)}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {item?.subCategory ? (
        <>
          <a href={item.path} onClick={() => setDropdown((state) => !state)}>
            {item.title}
            {depthLvl > 0
              ? hasSubMenu && <span>&raquo;</span>
              : hasSubMenu && <span className={BEM(css.nav, css.arrow)} />}
          </a>
          {hasSubMenu && (
            <Dropdown
              items={item?.subCategory}
              dropdown={dropdown}
              depthLvl={depthLvl}
            />
          )}
        </>
      ) : (
        <a href={item.path}>{item.title}</a>
      )}
    </li>
  );
};
