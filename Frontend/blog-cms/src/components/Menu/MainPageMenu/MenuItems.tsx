import React, { LiHTMLAttributes, MutableRefObject, useEffect, useRef, useState } from "react";
import { BEM } from "../../../tools";
import { MenuItemType } from "../../../types";
import { css } from "./cssBem";
import { Dropdown } from "./Dropdown";

interface IMenuItem  {
    item: MenuItemType
    depthLvl: number
}

export const MenuItems = ({item, depthLvl} : IMenuItem) => {
  const [dropdown, setDropdown] = useState(false);
  let ref: MutableRefObject<HTMLLIElement> = useRef();

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
   };
   
   const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
   };

  useEffect(() => {
    const handler = (event:any) => {
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
  }, [dropdown])

  return (
    <li
      className={BEM(css.nav, css.item)}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {item.subMenu ? (
        <>
          <a
            href={item.url}
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((state) => !state)}
          >
            {item.title}{" "}
            {depthLvl > 0 ? <span>&raquo;</span> : <span className={BEM(css.nav, css.arrow)}/>}
          </a>
          <Dropdown
            items={item.subMenu}
            dropdown={dropdown}
            depthLvl={depthLvl}
          />
        </>
      ) : (
        <a href={item.url}>{item.title}</a>
      )}
    </li>
  );
}; 