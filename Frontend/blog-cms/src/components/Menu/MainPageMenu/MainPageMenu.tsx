import React, { FC } from "react"
import { BEM } from "../../../tools";
import { MoreIco } from "../../Ico/MoreIco";
import "./style.css"

const css = {
    menu: "mainPageMenu",
    item: "item",
    
    content: "content",
    modifiers:{
        more: "more",
        logo: "pageLogo",
    }
}

const menu = [
    {name: "asd"},
    {name: "asd"},
    {name: "asd"},
    {name: "asd"},
]

const GetLogoClass = () => {
    return  BEM(css.menu, css.item, css.content) + " " + BEM(css.menu, css.item,  css.modifiers.logo);
}

export const MainPageMenu: FC = () => {
  return (
    <>
      <div className={BEM(css.menu)}>
        <a href="" className={BEM(css.menu, css.item)}>
          <div className={GetLogoClass()}>TwojaStaraCompany!</div>
        </a>
        {menu.slice(0,4).map((item, i) => {
          return (
            <MenuItem/>
          );
        })}
        <a href="" className={BEM(css.menu, css.item, css.modifiers.more)}>
          <div className={BEM(css.menu, css.item, css.content)}>
            <MoreIco/>
          </div>
        </a>
      </div>
    </>
  );
};

export const MenuItem: FC = (more: boolean) =>{
    return (
       <a href="" className={BEM(css.menu, css.item)}>
        <div className={BEM(css.menu, css.item, css.content)}>asd</div>
      </a>
      );
}