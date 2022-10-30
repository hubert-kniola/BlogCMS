import React, { FC } from "react";
import { BEM } from "../../tools";
import "./style.css"

const css = {
    footer: "mainPageFooter",
    item: "item",
}


export const Footer:FC = () => {
    return (
      <>
        <div className={BEM(css.footer)}>
          <div className={BEM(css.footer, css.item)}>facebook</div>
          <div className={BEM(css.footer, css.item)}>youtube</div>
          <div className={BEM(css.footer, css.item)}>instagram</div>
        </div>
      </>
    );
}