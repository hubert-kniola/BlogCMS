import React, { FC } from "react";
import { BEM } from "../../../tools";
import {css} from "./cssBem"
import { Navbar } from "./Navbar";


export const MainPageMenu:FC = () => {
    return (
      <header>
        <div className={BEM(css.mainPageMenu, css.area)}>
          <a href="/" className={BEM(css.mainPageMenu, css.logo)}>
            Company!
          </a>
          <Navbar/>
        </div>
      </header>
    );
};