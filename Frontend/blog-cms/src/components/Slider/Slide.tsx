import React from "react";
import { BEM } from "../../tools";
import { SlideType } from "../../types";
import { css } from "./css";

interface ISlide {
    slidesLenght: number;
    active: boolean;
    idx: number;
    slide: SlideType
}

export const Slide = ({slidesLenght, active, idx, slide} : ISlide) => {
    return (
      <div
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