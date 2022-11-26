import React, { FC } from "react";
import { BEM } from "../../tools";
import { SlideType } from "../../types";
import { css } from "./css";

type ISlide = {
    slidesLenght: number;
    active: boolean;
    idx: number;
    slide: SlideType
    onClickHandler: () => void;
}

export const Slide:FC<ISlide> = ({slidesLenght, active, idx, slide, onClickHandler}) => {
    return (
      <div
        onClick={!active ? () => onClickHandler() : () => void 0}
        style={{
          width: `${100 / slidesLenght}%`,
        }}
        className={BEM(css.slider, css.slide)}
        key={idx}
      >
        <div
          className={
            active
              ? BEM(css.slide, css.box, css.modifiers.active)
              : BEM(css.slide, css.box)
          }
          style={{
            backgroundImage: `url(${slide.photoUrl})`,
          }}
        >

            <div className="slide_content">
                <div className="slide_content--title">
                    <p className="slide_title">{slide.title}</p>
                    <p>{slide.content}</p>
                </div>
            </div> 
        </div>
      </div>
    );
}