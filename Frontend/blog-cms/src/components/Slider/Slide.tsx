import React from "react";
import { SlideType } from "../../types";

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
        className="slider_slide"
        key={idx}
      >
        <div
          className={active ? "slide_box--active" : `slide_box`}
          style={{
            backgroundImage: `url(${slide.photoUrl})`,
          }}
        ></div>
      </div>
    );
}