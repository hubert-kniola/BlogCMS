import React from "react";
import { BackgroundDiv } from "..";
import { BlobStorageURL } from "../../settings";
import { BEM } from "../../tools";
import { Carousel } from "../../types";
import { css } from "./css";

interface ISlide {
  slidesLenght: number;
  active: boolean;
  idx: number;
  slide: Carousel;
  onClickHandler: () => void;
}

export const Slide = ({
  slidesLenght,
  active,
  idx,
  slide,
  onClickHandler,
}: ISlide) => {
  return (
    <div
      onClick={!active ? () => onClickHandler() : () => void 0}
      style={{
        width: `${100 / slidesLenght}%`,
      }}
      className={BEM(css.slider, css.slide)}
      key={idx}>
      <BackgroundDiv
        url={slide && `${BlobStorageURL}${slide.imgName}`}
        className={
          active
            ? BEM(css.slide, css.box, css.modifiers.active)
            : BEM(css.slide, css.box)
        }>
        <div className="slide_content">
          <div className="slide_content--title">
            <p className="slide_title">{slide && slide.title}</p>
            <p>{slide && slide.content}</p>
          </div>
        </div>
      </BackgroundDiv>
    </div>
  );
};
