import React from "react";
import { BEM } from "../../tools";
import { css } from "./css";

interface ISliderNavigation {
  onClickHandler: (idx: number) => void;
  activeIdx: number;
  slides: any[];
}

export const SliderNavigation = ({
  onClickHandler,
  activeIdx,
  slides,
}: ISliderNavigation) => {
  return (
    <div className={BEM(css.slider, css.navigation)}>
      {slides &&
        slides.map((_, idx) => {
          return (
            <div
              key={idx}
              className={`${BEM(css.slider, css.navigation, css.dot)} ${
                idx === activeIdx
                  ? BEM(css.slider, css.navigation, css.modifiers.active)
                  : ""
              }`}
              onClick={() => onClickHandler(idx)}
            />
          );
        })}
    </div>
  );
};
