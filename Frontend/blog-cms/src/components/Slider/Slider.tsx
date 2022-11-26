import React, { useEffect, useRef, useState } from "react"
import { BEM } from "../../tools"
import { SlideType } from "../../types"
import { css } from "./css"
import { Slide } from "./Slide"
import { SliderNavigation } from "./SliderNavigation"
import "./style.css"

interface ISlider  {
  slides : SlideType[]
}

export const Slider = ({slides} : ISlider) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      5000
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <>
      <div className={BEM(css.slider, css.container)}>
        <div className={BEM(css.slider, css.view)}>
          <div
            className={BEM(css.slider, css.row)}
            style={{
              width: `${100 * slides.length}%`,
              transform: `translate3d(${
                (-index * 100) / slides.length
              }%, 0, 0)`,
            }}
          >
            {slides.map((item, idx) => {
              return (
                <Slide
                  key={idx}
                  slidesLenght={slides.length}
                  active={index === idx}
                  idx={idx}
                  slide={item}
                  onClickHandler={() => setIndex(idx)}
                  />
              );
            })}
          </div>
        </div>
      </div>
      <SliderNavigation
        onClickHandler={(idx: number) => setIndex(idx)}
        activeIdx={index}
        slides={slides}
      />
    </>
  );
}